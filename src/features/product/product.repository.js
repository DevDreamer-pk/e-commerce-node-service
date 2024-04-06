import { ObjectId } from "mongodb";
import { getDb } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";

class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async add(newProduct) {
    try {
      const database = getDb();
      const collection = database.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      throw new ApplicationError("Error while creating product", 500);
    }
  }

  async getAll() {
    try {
      const database = getDb();
      const collection = database.collection(this.collection);
      const products = await collection.find({}).toArray();
      return products;
    } catch (err) {
      throw new ApplicationError("Error while getting product", 500);
    }
  }

  async get(id) {
    try {
      const database = getDb();
      const collection = database.collection(this.collection);
      const product = await collection.findOne({ _id: new ObjectId(id) });
      return product;
    } catch (err) {
      throw new ApplicationError("Error while get product by id", 500);
    }
  }

  async filter(minPrice, maxPrice, category) {
    try {
      const database = getDb();
      const collection = database.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: minPrice };
      }
      if (maxPrice) {
        filterExpression.price = { ...filterExpression.price, $lte: maxPrice };
      }
      if (category) {
        filterExpression.category = category;
      }
      const products = await collection.find(filterExpression).toArray();
      return products;
    } catch (err) {
      throw new ApplicationError("Error while filtering product", 500);
    }
  }

  async rate(userId, productId, rating) {
    try {
      const database = getDb();
      const collection = database.collection(this.collection);

      // const product = await collection.findOne({_id : new ObjectId(productId)});
      // const userRating = product?.ratings?.find(rating => rating.userId == userId);
      // console.log("userRating : ", userRating);
      // console.log("product : ", product);

      await collection.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $pull: { ratings: { userId: new ObjectId(userId) } },
        }
      );

      await collection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $push: { ratings: { userId: new ObjectId(userId), rating: rating } },
        }
      );
    } catch (err) {
      throw new ApplicationError("Error while rating product", 500);
    }
  }
}

export default ProductRepository;
