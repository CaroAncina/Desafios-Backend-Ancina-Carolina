const ProductManager = require('./ProductManager.js')
const express = require('express')
const manager = new ProductManager('./src/Productos.json')


const app = express()

const PORT = 8080
app.use(express.urlencoded({ extended: true }))


//req.params






//req.querys





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
