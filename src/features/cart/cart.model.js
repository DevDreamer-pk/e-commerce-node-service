import {UserModel} from "../user/user.model.js";
import ProductModel from "../product/product.model.js";

export default class CartModel {
    constructor(userId, productId, quantity) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
    }
    static add(userId,productId,quantity){
        const user = UserModel.getAll().find(user => user.id == userId);
        // console.log("user from cart",user)
        if(!user){
            return 'User not found';
        }

        const product = ProductModel.getById(productId);
        // console.log("product from cart",product)
        if(!product){
            return 'Product not found';
        }
        const cartItem = new CartModel(cart.length + 1, userId, productId, quantity);
        // console.log("cart Item",cartItem)
        cart.push(cartItem);
        return cartItem;

        // const isCartItemIndex = cartItems.findIndex(i => i.productId == productId)
        // if(isCartItemIndex == -1){
        //   const cartItem = new cartModel(userId, Number(productId), quantity);
        //   console.log("cart Item if ",cartItem)
      
        //   cartItems.push(cartItem);
        //   console.log(cartItems);
        //   return cartItem;
        // } else {
        //   const cartItem = new cartModel(userId, Number(productId), quantity);
        //   cartItems[isCartItemIndex] =  cartItem;
        //   console.log("else")
        //   console.log(cartItems);
        //   return cartItem;
        // }
    }

    static getCartbyuser(id){
       return cart.filter(cart => cart.userId == id);      
    }

    static delete(cartId, userId){
        const itemIndex = cart.findIndex(cart => cart.id == cartId && cart.userId == userId);
        console.log("itemIndex : ",itemIndex)
        if(itemIndex == -1){
            return 'Item not found';
        } else {
            cart.splice(itemIndex,1);
        }
    }
}

var cart = [
    new CartModel(1, 1, 1, 2)
]
