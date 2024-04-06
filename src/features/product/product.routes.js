import ProductController from "./product.controller.js";
import {uploadFile} from "../../middlewares/fileupload.middlewae.js";
import express from "express";

const router = express.Router();

const productController = new ProductController();

router.get("/", (req, res) => {
    productController.getAllProducts(req, res);
});
router.post("/add-product", uploadFile.single("imageUrl") ,(req, res) => {
    productController.addProduct(req, res);
});
router.get("/:id", (req, res) => {
    productController.getProductById(req, res);
});
router.get("/filter-products/filter", (req, res) => {
    productController.filterProducts(req, res);
});
router.post("/rate-product", (req, res, next) => {
    productController.rateProduct(req, res, next);
});

export default router;

