import { Router } from "express";
import { getCarts, getCartById, createCart, addProductToCart, updateCart, updateProductQuantity, clearCart, removeProductFromCart } from '../controllers/cartsController.js';

const router = Router();

router.get('/', getCarts);
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/product/:pid', addProductToCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid', clearCart);
router.delete('/:cid/products/:pid', removeProductFromCart);

export default router;
