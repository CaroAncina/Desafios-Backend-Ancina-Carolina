class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(product) {
        // Verifico que no se repita el id
        if (this.products.some(p => p.code === product.code)) {
            console.log("Ya existe un producto con el mismo código.");
            return;
        }

        // Verifico que se completen todos los campos
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        // Se incrementa el id
        const product_id = this.nextId++;

        const newProduct = {
            id: product_id,
            ...product
        };

        this.products.push(newProduct);
    }

    // Devuelve el array con todos los productos agregados
    getProducts() {
        return this.products;
    }

    // Busca en el array los productos que coincidan con el código
    getProductById(product_id) {
        const product = this.products.find(p => p.id === product_id);

        if (!product) {
            console.log("Producto no encontrado");
            return;
        }
        return product;
    }
}

const productManager = new ProductManager();

// Agrego productos al array
productManager.addProduct({
    title: "Torta",
    description: "Descripción del producto",
    price: 5400,
    thumbnail: 'ruta/imagenA.jpg',
    code: 'B001',
    stock: 5
})

productManager.addProduct({
    title: "Tarta frutal",
    description: "Descripción del producto",
    price: 4800,
    thumbnail: 'ruta/imagenB.jpg',
    code: 'B002',
    stock: 3
})

productManager.addProduct({
    title: "Lemon Pie",
    description: "Descripción del producto",
    price: 4000,
    thumbnail: 'ruta/imagenC.jpg',
    code: 'B003',
    stock: 2
})

productManager.addProduct({
    title: "Pan dulce",
    description: "Descripción del producto",
    price: 4500,
    thumbnail: 'ruta/imagenD.jpg',
    code: 'B004',
    stock: 6
})

// Muestro los productos 
const products = productManager.getProducts()
console.log(products)

// Muestro el producto que coincida con el id
const buscando_producto = productManager.getProductById(2)
console.log(buscando_producto)

