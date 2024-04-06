import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true, match : [/.+\@\S+\.\S+/, "Invalid email"]},
    password: {type :String,
    validate : {
        validator : (value) => {
            return value.length > 6
        }, message : "Password should be more than 6 characters"
    }},
    userType: {type: String, enum: ['seller', 'customer']}
})