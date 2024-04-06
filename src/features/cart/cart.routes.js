import Express  from "express";
import bodyParser from "body-parser";
import CartController from "./cart.controller.js";

const cartRouter = Express.Router();

cartRouter.use(bodyParser.json());
const cartController = new CartController();

cartRouter.post("/", (req, res) => {
    cartController.addToCart(req, res);
});
cartRouter.get("/get-all-cart", (req, res) => {
    cartController.getCartByUser(req, res);
});
cartRouter.delete("/delete-item/:cartId", (req, res) => {
    cartController.deleteItem(req, res);
});
// cartRouter.post("/login", userController.login);
// cartRouter.get("/all-users", userController.getAllUsers);

export default cartRouter;