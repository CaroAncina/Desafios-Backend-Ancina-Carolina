const express = require('express')
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.js")
const cartsRouter = require("./routes/carts.js")
const viewsRouter = require("./routes/views.js")
const Server = require('socket.io')
const httpServer = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`));
const socketServer = Server(httpServer);
const ProductManager = require("./classes/productManager.js");
const productMngr = new ProductManager('./Productos.json');

<<<<<<< HEAD
=======

>>>>>>> 83b01996588628bdd5edf6b5943bdebc374f967a
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Configuración de Handlebars
app.engine('handlebars', handlebars());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');


socketServer.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('chat message', (msg) => {
        socketServer.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});


