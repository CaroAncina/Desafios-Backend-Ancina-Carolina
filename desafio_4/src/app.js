const express = require('express');
const app = express();
const PORT = 8080;
const path = require("path")
const handlebars = require("express-handlebars");
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const productsRouter = require("./routes/products.js")
const cartsRouter = require("./routes/carts.js")
const viewsRouter = require("./routes/views.js")
const ProductManager = require("./classes/productManager.js");
const productManager = new ProductManager('./Productos.json');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});


io.on('connection', (socket) => {
    console.log('Usuario conectado');

    productManager.getProducts().then((productos) => {
        socket.emit('productos', productos);
    });

    socket.on('nuevoProducto', (producto) => {
        productManager.addProduct(producto.code, producto.title, producto.description, producto.price, [], producto.stock)
            .then(() => {
                return productManager.getProducts();
            })
            .then((productos) => {
                io.emit('productos', productos);
                socket.emit('respuestaAdd', 'Producto agregado correctamente');
            })
            .catch((error) => {
                socket.emit('respuestaAdd', 'Error al agregar el producto: ' + error.message);
            });
    });

    socket.on('eliminarProducto', (pid) => {
        productManager.deleteProduct(pid)
            .then(() => {
                return productManager.getProducts();
            })
            .then((productos) => {
                io.emit('productos', productos);
                socket.emit('respuestaDelete', 'Producto eliminado correctamente');
            })
            .catch((error) => {
                socket.emit('respuestaDelete', 'Error al eliminar el producto: ' + error.message);
            });
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});