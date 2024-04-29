const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const exphbs = require('express-handlebars');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 8080;
const { dirname } = path;


const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const viewsRouter = require('./routes/views');
const ProductManager = require('./classes/productManager');
const productManager = new ProductManager('./Productos.json');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// RUTAS
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// HANDLEBARS
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


// Configura Socket.IO para escuchar conexiones
io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Ejemplo de mensaje de chat (broadcast a todos los clientes)
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Manejo de desconexión de un usuario
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

// Ruta principal - Renderiza una vista utilizando Handlebars
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to my App!' });
});

// Inicia el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
