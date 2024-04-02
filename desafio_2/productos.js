const ProductManager = require('./ProductManager.js')

const manager = new ProductManager()

// Crear nuevos productos
manager.addProduct({
    title: "Torta",
    description: "Descripción del producto",
    price: 5400,
    thumbnail: 'ruta/imagenA.jpg',
    code: 'B001',
    stock: 5
})

manager.addProduct({
    title: "Tarta frutal",
    description: "Descripción del producto",
    price: 4800,
    thumbnail: 'ruta/imagenB.jpg',
    code: 'B002',
    stock: 3
})

manager.addProduct({
    title: "Lemon Pie",
    description: "Descripción del producto",
    price: 4000,
    thumbnail: 'ruta/imagenC.jpg',
    code: 'B003',
    stock: 2
})

manager.addProduct({
    title: "Pan dulce",
    description: "Descripción del producto",
    price: 4500,
    thumbnail: 'ruta/imagenD.jpg',
    code: 'B004',
    stock: 6
})

manager.addProduct({
    title: "Budin",
    description: "Descripción del producto",
    price: 2500,
    thumbnail: 'ruta/imagenE.jpg',
    code: 'B005',
    stock: 8
})


// Consultar todos los productos
manager.getproducts()
    .then(products => console.log('Lista de productos:', products))
    .catch(error => console.error("Error al mostrar el producto", error));

 /* // Obtener un producto por su ID después de actualizarlo
manager.getproductsbyId(1)
    .then(product => console.log('El producto actualizado es:', product))
    .catch(error => console.error("Error al buscar el producto:", error));

 // Actualizar un producto por su ID
manager.updateProduct(1, { price: 5600, stock: 7 })
    .then(updatedProduct => console.log("Producto actualizado correctamente:", updatedProduct))
    .catch(error => console.error("Error al actualizar el producto:", error));

// Eliminar un producto por su ID
manager.deleteProduct(3)
    .then(() => console.log("Producto eliminado correctamente"))
    .catch(error => console.error("Error al eliminar el producto:", error)); 
 
  */