class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        //Verifico que no se repita el id
        if (this.products.some(product => product.code === code)) {
            console.log("Ya existe un producto con el mismo código.");
            return;
        }

        //Verifico que se completen todos los campos
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        //se incrementa el id
        const product_id = this.products.length + 1;

        const product = {
            id: product_id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(product);
    }

    //devuelve el array con todos los productos agregados
    getProducts() {
        return this.products
    }

    //busca en el array los productos que coincidan con el id
    getProductById(product_code) {
        const producto_encontrado = this.products.find(product => product.code === product_code)
    
        if (producto_encontrado) {
            return console.log ("El producto encontrado es:", producto_encontrado);
        } else {
            console.log("Not found");
            return;
        }
    }    
}

const productManager = new ProductManager();

//Agrego productos al array
productManager.addProduct("Zapatillas", "descripcion zapatillas", 20000, "No hay imagen", 101, 8)
productManager.addProduct("Remera", "descripcion remera", 12000, "No hay imagen", 102, 12)
productManager.addProduct("Jeans", "descripcion jeans", 18000, "No hay imagen", 103, 6)
productManager.addProduct("Gorra", "descripcion gorra", 7000, "No hay imagen", 104, 9)

//Muestro los productos 
const products = productManager.getProducts()
console.log(products)

//Muestro los productos que coincidad con el id
const buscando_productos = productManager.getProductById(102)
console.log(buscando_productos)


