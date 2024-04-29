const express = require('express');
const path = require("path")
const app = express()
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 8080
const handlebars = require('handlebars')
const __dirname = require('./utils.js')
const productsRouter = require("./routes/products.js")
const cartsRouter = require("./routes/carts.js")
const ProductManager = require("./classes/productManager.js")
const productMngr = new ProductManager('./Productos.json')

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

// Ruta principal - Renderiza una vista utilizando Handlebars
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to my App!' });
});

// Configura Socket.IO para escuchar conexiones
io.on('connection', (socket) => {
    console.log('A user connected');

    // Ejemplo de mensaje de chat (broadcast a todos los clientes)
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Manejo de desconexión de un usuario
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});



app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
