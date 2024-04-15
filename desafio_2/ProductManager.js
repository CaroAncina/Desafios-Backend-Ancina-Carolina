const fs = require('fs').promises;

class ProductManager {

    static lastId = 0

    constructor(path) {
        this.products = [],
            this.path = path
    }

    async addProduct(newObjet) {
        try {
            let { title, description, price, thumbnail, code, stock } = newObjet

            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Todos los campos son obligatorios.");
                return;
            }

            const productoEncontrado = this.products.find((id) => id.code === code)
            if (productoEncontrado) {
                console.log("Ya existe un producto con el mismo código.");
                return;
            }

            const newProduct = {
                id: ++ProductManager.lastId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            this.products.push(newProduct);
            console.log(newProduct)//Mostrar los productos por consola, antes de cargarlos en el JSON
            await this.saveProducts(this.products);

        } catch (error) {
            console.log("Error al cargar un producto", error);
        }
    }

    async getproducts() {
        try {
            const res = await fs.readFile(this.path, 'utf-8')
            const arrayDeProductos = JSON.parse(res)
            return arrayDeProductos
        } catch (error) {
            console.log('Error al leer el archivo', error)
        }
    }

    async getproductsbyId(id) {
        try {
            const arrayProducts = await this.getproducts()
            const idProduct = arrayProducts.find(item => item.id === id);

            if (!idProduct) {
                console.log('No se encuentra el producto')
            } else {
                return idProduct
            }
        } catch (error) {
            console.error("Error en el archivo", error)
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const arrayProducts = await this.getproducts();

            const index = arrayProducts.findIndex(item => item.id === id);
            if (index !== -1) {
                arrayProducts.splice(index, 1, updatedFields)
                await this.saveProducts(arrayProducts)
            } else {
                console.log('No se encuentra el producto a actualizar')
            }
        } catch (error) {
            console.error("Error al actualizar el producto", error);
        }
    }
    async deleteProduct(id) {
        try {
            const arrayProducts = await this.getproducts();
            const updatedProducts = arrayProducts.filter(item => item.id !== id);
            await this.saveProducts(updatedProducts);
        } catch (error) {
            console.error("Error al eliminar el producto", error);
        }
    }

    async saveProducts(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error) {
            console.error("Error al guardar el archivo", error);
            throw error;
        }
    }
}

module.exports = ProductManager;
