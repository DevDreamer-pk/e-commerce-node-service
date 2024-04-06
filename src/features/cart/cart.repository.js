// import { ObjectId } from "mongodb";
import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";

import ApplicationError from "../../error-handler/applicationError.js";

class CartRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async add(productId, userId, quantity) {
    try {
        // const {} = cartData;
        console.log("Cart Data : ",userId,productId,quantity)
      const database = getDb();
      const collection = database.collection(this.collection);
      await collection.updateOne(
        {productId : new ObjectId(productId), userId : new ObjectId(userId) },
        {$inc : {quantity : quantity}},
        {upsert: true}
      );
    } catch (err) {
      throw new ApplicationError("Error while creating cart", 500);
    }
  }

  async getCartById(userId) {
    try {
      const database = getDb();
      const collection = database.collection(this.collection);
      const cardData = await collection.find({userId : new ObjectId(userId)}).toArray();
      return cardData;
    } catch (err) {
      throw new ApplicationError("Error while getting cart", 500);
    }
  }

  async delete(userId,cartItemId) {
    try {
      const database = getDb();
      const collection = database.collection(this.collection);
      const product = await collection.deleteOne({userId : new ObjectId(userId), _id : new ObjectId(cartItemId)});
      return product.deletedCount>0;
    } catch (err) {
      throw new ApplicationError("Error while deleting cart by id", 500);
    }
  }


}

export default CartRepository;
