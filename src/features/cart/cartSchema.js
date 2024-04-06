import mongoose from 'mongoose'

export const cartSchema = new mongoose.Schema({
    userId: {type : mongoose.Schema.Types.ObjectId, ref: 'users'},
    productId: {type : mongoose.Schema.Types.ObjectId, ref: 'products'}, 
    quantity: Number
})