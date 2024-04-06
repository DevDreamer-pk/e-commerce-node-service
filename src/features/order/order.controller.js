import OrderRepository from "./order.repository.js";
export default class OrderController {

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(req, res, next) {
        try {
            const userId = req.userId;
            await this.orderRepository.placeOrder(userId);
            res.status(200).send({ message: "Order placed successfully" });
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}