import cartModel from '../models/cartsModel.js';

class CartsData {
    async findAll() {
        try {
            return await cartModel.find().populate('products.product').lean();
        } catch (error) {
            console.error('Error al obtener todos los carritos:', error);
            throw error;
        }
    }

    async findById(cartId) {
        try {
            return await cartModel.findById(cartId).populate('products.product').lean();
        } catch (error) {
            console.error('Error al obtener el carrito por ID:', error);
            throw error;
        }
    }

    async create() {
        try {
            return await cartModel.create({});
        } catch (error) {
            console.error('Error al crear un nuevo carrito:', error);
            throw error;
        }
    }

    async updateById(cartId, updateData) {
        try {
            return await cartModel.findByIdAndUpdate(cartId, updateData, { new: true }).populate('products.product').lean();
        } catch (error) {
            console.error('Error al actualizar el carrito:', error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al agregar el producto al carrito:', error);
            throw error;
        }
    }

    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity = quantity;
                await cart.save();
                return await cartModel.findById(cartId).populate('products.product').lean();
            } else {
                throw new Error('Producto no encontrado en el carrito');
            }
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto:', error);
            throw error;
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al vaciar el carrito:', error);
            throw error;
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            cart.products = cart.products.filter(p => p.product.toString() !== productId);
            await cart.save();
            return await cartModel.findById(cartId).populate('products.product').lean();
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
            throw error;
        }
    }
}

export default new CartsData();
