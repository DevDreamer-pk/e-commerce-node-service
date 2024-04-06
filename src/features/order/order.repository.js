import { ObjectId } from "mongodb";
import { getDb, getClient } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";
import ApplicationError from "../../error-handler/applicationError.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    try {
        const client = getClient();
        const session = client.startSession();
        session.startTransaction();

        const db = getDb();
        const items = await this.getTotalAmountByUserId(userId, session)
        const finalTotalAmount = items.reduce((acc, item)=> acc + item.totalAmount, 0)
        // console.log(finalTotalAmount)

        const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount, new Date());
        await db. collection(this.collection).insertOne(newOrder, {session});

        // for(let item of items){
        //     await db.collection("products").updateOne(
        //         {_id : item.productId},
        //         {$inc : {stock : -item.quantity}}
        //     )
        // }

        await db.collection("cartItems").deleteMany(
            {
                userId : new ObjectId(userId)
            },
            {session}
            );

    } catch (error) {
        throw new ApplicationError('Error while placing order', 404);
    }

    
  }

  async getTotalAmountByUserId(userId) {
    const db = getDb();
    const items = await db.collection("cartItems").aggregate([
      {
        $match: {
          userId: new ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productInfo",
        }
      },
      {
        $unwind: "$productInfo"
      },
      {
          $addFields: {
              "totalAmount": {
                  $multiply: ["$productInfo.price", "$quantity"]
              }
          }
      }
    ], {session}).toArray();

    return items;
  }
}
