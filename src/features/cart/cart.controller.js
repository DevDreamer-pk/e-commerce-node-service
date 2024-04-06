import CartRepository from "./cart.repository.js";
import { ObjectId } from "mongodb";
export default class CartController {
    constructor() {
        this.cartRepository = new CartRepository();
      }

    async addToCart(req, res) {
        try {
            const { productId, quantity } = req.body;
            console.log(productId, quantity)
            const userId = req.userId;
            console.log("user ID from payload",userId)
            await this.cartRepository.add(productId, userId, quantity);
            // if(!result){
            //     return res.status(404).send({message: "Item not found"});
            // }
            res.status(201).send("Cart is updated");
        } catch (error) {
            res.status(500).send({ message: error.message });
        }

    }
    async getCartByUser(req, res) {
        try {
            const userId = req.userId;
            console.log("user ID from payload",userId)
            const cart = await this.cartRepository.getCartById(userId);
            console.log(cart)
            if(!cart){
                return res.status(404).send({message: "Cart not found"});
            }
            res.status(200).send(cart);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }

    }

    async deleteItem(req, res){
        try {
            const userId = req.userId;
            const cartId = req.params.cartId;
            const cart = await this.cartRepository.delete(userId,cartId);
            console.log(cart)
            if(!cart){
                return res.status(404).send({message: "Item not found"});
            }
            return res.status(200).send({message: "Item deleted successfully"});
        } catch (error) {
            res.status(500).send({ message: error.message });
        }

    }
}