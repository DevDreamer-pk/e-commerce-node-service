import { UserModel } from "../user/user.model.js";
import ApplicationError from "../../error-handler/applicationError.js";
export default class ProductModel {
    constructor( name, description, imageUrl, category, price, sizes,id) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
        this.price = price;
    }

    static getById(id) {
        return products.find((product) => product.id == id);
    }
    static add(product) {
        product.id = products.length + 1;
        products.push(product);
        return product;
    }
    static getAll() {
        return products;
    }

    static filter(minPrice, maxPrice, category ) {
        const filtered = products.filter((product) => (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice) && (!category || product.category == category));
        return filtered;
    }

    static rateProduct(userId, productId, rating) {
        const user = UserModel.getAll().find(user => user.id == userId);
        if(!user){
            return 'User not found';
        }
        const product = products.find(product => product.id == productId);
        if(!product){
            throw new ApplicationError('Product not found', 404);
        }

        if(!product.ratings){
            product.ratings = [];
            product.ratings.push({userId: userId, rating: rating});
        }else{
            const existingRatingIndex = product.ratings.findIndex(rating => rating.userId == userId);
            // console.log("existingRatingIndex : ",existingRatingIndex)
            if(existingRatingIndex >= 0){
                product.ratings[existingRatingIndex]= {userId: userId, rating: rating};
            } else {
                product.ratings.push({userId: userId, rating: rating});
            }
        }
    }
}

export var products = [
    new ProductModel(1, "T-Shirt", "T-Shirt", "https://cdn.shopify.com/s/files/1/0055/8635/8850/products/1_700x700.jpg?v=1663999769", "T-Shirt", 100, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    new ProductModel(2, "T-Shirt", "T-Shirt", "https://cdn.shopify.com/s/files/1/0055/8635/8850/products/2_700x700.jpg?v=1663999769", "T-Shirt", 50, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    new ProductModel(3, "T-Shirt", "T-Shirt", "https://cdn.shopify.com/s/files/1/0055/8635/8850/products/3_700x700.jpg?v=1663999769", "T-Shirt", 10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
]

