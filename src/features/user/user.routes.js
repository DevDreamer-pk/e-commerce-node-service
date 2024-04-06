import Express  from "express";
import bodyParser from "body-parser";
import UserController from "./user.controller.js";

import jwtAuth from "../../middlewares/jwt.middleware.js";

const UserRouter = Express.Router();

UserRouter.use(bodyParser.json());
const userController = new UserController();

UserRouter.post("/signup", userController.signup);
UserRouter.post("/login", userController.login);
UserRouter.get("/all-users", userController.getAllUsers);
UserRouter.put("/reset-password",jwtAuth, userController.resetPasscode);

export default UserRouter;

