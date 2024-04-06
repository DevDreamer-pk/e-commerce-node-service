// import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  }
  async addProduct(req, res) {
    try {
      const { name, description, category, sizes } = req.body;
      const price = parseInt(req.body.price); 
      const newProduct = {
        name,
        description,
        category,
        price,
        sizes,
        imageUrl: req.file.filename,
      };
      console.log("newProduct filename : ", newProduct);
      const productAdded = await this.productRepository.add(newProduct);

      return res
        .status(201)
        .send({ message: "Product added successfully", productAdded });
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  }

  async getProductById(req, res) {
    try {
      const id = req.params.id;
      console.log("Id by getProductById : ", id);
      const product = await this.productRepository.get(id);
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      return res.status(200).send(product);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  }

  async filterProducts(req, res) {
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;

      const products = await this.productRepository.filter(
        minPrice,
        maxPrice,
        category
      );

      if (products.length === 0) {
        return res.status(404).send({ message: "Product not found by filter" });
      }
      return res.status(200).send(products);
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  }

  async rateProduct(req, res) {
    try {
        const userId = req.userId;
        const productId = req.body.productId;
        const rating = req.body.rating;
        console.log("userId : ", userId, "productId : ", productId, "rating : ", rating);
        const rated = await this.productRepository.rate(userId, productId, rating);
        return res.status(200).send({ message: "Product rated successfully", rated });
    } catch (err) {
        console.log(err);
        return res.status(404).send({ message: err.message });
    }
  }
}
