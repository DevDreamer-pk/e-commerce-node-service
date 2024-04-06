import { getDb } from "../../config/mongodb.js";
import ApplicationError from "../../error-handler/applicationError.js";
import bcrypt from 'bcrypt'
export class UserModel {
  constructor( name, email, password, userType) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.userType = userType;
  }
  static async SignUp(name, email, password, userType) {
    try {
      // Get the database
      const db = getDb();
      // get the collection
      const collection = db.collection("users");
      const newUser = new UserModel(name, email, password, userType);
      // insert the document
      await collection.insertOne(newUser);
      return newUser;
    } catch (err) {
      throw new ApplicationError("Error while creating user", 500);
    }
  }

  static async SignIn(email, password) {
    const db = getDb();
    const collection = db.collection("users");

    const userFind = await collection.findOne({email: email});
    if(!userFind) {
        return false
    }
    const isMatch = await bcrypt.compare(password, userFind.password)
    if(!isMatch) {
        return false
    }
    // const user = { email: email, password: isMatch};
    // const userFound = await collection.findOne(user);
    return userFind;
  }

  static async getUserByEmail(email) {
      
  }

  static getAll() {
    return users;
  }
}

var users = [
  {
    id: 1,
    name: "Seller User Sahil",
    email: "seller@user.com",
    password: "admin",
    userType: "seller",
  },
  {
    id: 2,
    name: "coustomer",
    email: "customer@user.com",
    password: "customer",
    userType: "customer",
  },
];
