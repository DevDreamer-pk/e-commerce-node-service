import mongoose from 'mongoose'

export const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    category: String,
    sizes: [Number],  
    price: Number,

})