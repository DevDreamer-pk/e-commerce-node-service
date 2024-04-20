import dotenv from "dotenv"
//Load all the environment variables from .env file into process.env
dotenv.config();
import experss from "express";
import swagger from "swagger-ui-express";
import cors from "cors";

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cart.routes.js";
import bodyParser from "body-parser";
import jwtAuthorizer from "./src/middlewares/jwt.middleware.js";
import apiDocs from "./swagger.json" assert {type: "json"};
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import ApplicationError from "./src/error-handler/applicationError.js";
import {connectToMongoDB} from "./src/config/mongoose.Config.js";
import orderRouter from "./src/features/order/order.routes.js";
import rabbitMQConsumer from "./src/middlewares/rabbitmq.consumer.js";


const server = experss();

// configure cors policy 
var corsOptions = {
    origin: "http://localhost:5000", 
    // allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],  
}
server.use(cors(corsOptions));

server.use(bodyParser.json());
// server.use(loggerMiddleware);

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

server.use("/api/products", jwtAuthorizer,productRouter) 
server.use("/api/users", userRouter)
server.use("/api/cart", loggerMiddleware,jwtAuthorizer, cartRouter)
server.use("/api/orders", jwtAuthorizer, orderRouter)

server.use((err, req, res, next) => {
    console.log(err);
    if(err instanceof ApplicationError) {
        return res.status(err.status).send(err.message);
    }
    res.status(500).send('Something went wrong');
    // next();
})

server.use((req,res) => {
    res.status(404).send("API not found");
})


server.listen(4000, () => {
    console.log("Listening on port 4000"); 
    connectToMongoDB();
    rabbitMQConsumer();
})