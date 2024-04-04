const fs = require('fs').promises;

class ProductManager {
    constructor() {
        this.path = "Productos.json";
        this.nextId = 1;
        this.products = [];
    }

    async addProduct(product) {
        try {
            let products = await this.getproducts();

            // Verificar si el producto ya existe
            const productoEncontrado = products.find((p) => p.code === product.code)
            if (productoEncontrado) {
                console.log("Ya existe un producto con el mismo código.");
                return;
            }
            // Verifico que se completen todos los campos
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                console.log("Todos los campos son obligatorios.");
                return;
            }

            const newProduct = {
                id: this.nextId++,
                ...product
            };

            this.products.push(newProduct);

            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
            console.log("Producto agregado correctamente");
        } catch (error) {
            console.log("Error al cargar un producto", error);
        }
    }

    async getproducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw error;
            }
        }
    }

    async getproductsbyId(id) {
        try {
            let products = await this.getproducts()

            const product = products.find(p => p.id === id);

            if (product) {
                return product;
            } else {
                throw new Error(`Producto con ID ${id} no encontrado`);
            }
        } catch (error) {
            console.error("Error al consultar el producto", error)
            return []
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            let products = await this.getproducts();

            // Buscar el producto por su ID
            const index = products.findIndex(product => product.id === id);

            if (index !== -1) {
                // Actualizar el producto con los nuevos campos
                products[index] = { ...products[index], ...updatedFields };

                await fs.writeFile(this.path, JSON.stringify(products, null, 2));
                console.log(`Producto con ID ${id} actualizado correctamente`);
            } else {
                throw new Error(`Producto con ID ${id} no encontrado`);
            }
        } catch (error) {
            console.error("Error al actualizar el producto", error);
        }
    }

    async deleteProduct(id) {
        try {
            let products = await this.getproducts();

            // Filtrar los productos para excluir el producto con el ID proporcionado
            const updatedProducts = products.filter(product => product.id !== id);

            await fs.writeFile(this.path, JSON.stringify(updatedProducts, null, 2));
            console.log(`Producto con ID ${id} eliminado correctamente`);
        } catch (error) {
            console.error("Error al eliminar el producto", error);
        }
    }
}

module.exports = ProductManager;
