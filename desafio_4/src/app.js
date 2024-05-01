const express = require('express');
const app = express();
const PORT = 8080;
const path = require("path")
const handlebars = require("express-handlebars");
const productsRouter = require("./routes/products.js")
const cartsRouter = require("./routes/carts.js")
const viewsRouter = require("./routes/views.js")
const ProductManager = require("./classes/productManager.js");
const productMngr = new ProductManager('./Productos.json');

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
        const products = await productMngr.getProducts();
        res.render('home', { products }); 
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})