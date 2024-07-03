import cartsData from '../dao/data/cartsData.js';

class CartService {
    async getCarts() {
        return await cartsData.findAll();
    }

    async getCartById(cartId) {
        return await cartsData.findById(cartId);
    }

    async createCart() {
        return await cartsData.create();
    }

    async addProductToCart(userId, productId) {
        const user = await userService.getUserById(userId); // Asegúrate de tener un userService con getUserById
        if (!user || !user.cart) {
            throw new Error('Usuario no logueado o carrito no encontrado');
        }

        return await cartsData.addProductToCart(user.cart, productId);
    }

    async updateCart(cartId, products) {
        return await cartsData.updateById(cartId, { products });
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await cartsData.updateProductQuantity(cartId, productId, quantity);
    }

    async clearCart(cartId) {
        return await cartsData.clearCart(cartId);
    }

    async removeProductFromCart(cartId, productId) {
        return await cartsData.removeProductFromCart(cartId, productId);
    }
}

export default new CartService();
