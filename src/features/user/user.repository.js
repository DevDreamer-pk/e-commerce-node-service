import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import {userSchema} from "./user.schema.js";
import ApplicationError from "../../error-handler/applicationError.js";
// import { getDb } from "../../config/mongodb.js";

const userModel = mongoose.model("users", userSchema);


export default class UserRepository {
    async signUpUser(user) {
        try {
            const newUser = new userModel(user);
            await newUser.save();
            return newUser;
        } catch (error) {
            console.log(error);
            if (error instanceof mongoose.Error.ValidationError) {
                throw error;
            }else {
                throw new ApplicationError("Error while signing up", 500);
            }
            
        }
    }

    async signIn(email, password) {
        try {
            const user = await userModel.findOne({email});
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                return false
            }
            return user;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Error while signing in", 500);
        }
    }

    async resetPassword(userId, newPassword) {
        try {
            console.log(userId, newPassword);
            const user = await userModel.findById(userId);
            console.log(user);
            if (user){
                user.password = newPassword;
                user.save();
            }
            return user;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Error while signing in", 500);
        }      
    }

     async getAllUsers() {
        try {
          const users =await userModel.find();
          return users;
        } catch (error) {
            throw new ApplicationError("Error while signing in", 500);
        }
    }
}