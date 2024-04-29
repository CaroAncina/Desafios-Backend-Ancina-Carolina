const express = require('express');
const ProductManager = require('./ProductManager.js');

const manager = new ProductManager('./Productos.json');

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

//1er. endpoint 
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await manager.getproducts();
        const response = limit ? products.slice(0, limit) : products;

        res.json(response);
    } catch (error) {
        console.log(error)
        return res.send('Error al cargar productos')
    }
});


//2do. endpoint
app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await manager.getproductsbyId(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.send('Error al buscar el producto');
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
