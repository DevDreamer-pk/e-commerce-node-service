import  {UserModel}  from "./user.model.js";
import UserRepository from "./user.repository.js";
import  Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
const userRepository = new UserRepository()
export default class UserController {

    // constructor() {
    //     this.userRepository = new UserRepository();
    // }


    async signup(req, res) {
        const { name, email, password, userType } = req.body;
        console.log(name , email , password , userType)
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        // const newUser = { name, email, password: hashedPassword, userType };
        const signedUp = await userRepository.signUpUser({name, email, password: hashedPassword, userType});
        console.log("signedUp : ",signedUp)
        if(!signedUp) {
            return res.status(400).send({ message: "User already exists" });
        }
        return res.status(201).send({ message: "User created successfully", signedUp });
    }

    async login(req, res) {
        const { email, password } = req.body;
        // const user = { email, password };
        // console.log("user : ",email,password )
        const user = await userRepository.signIn(email,password);
        console.log("loggedIn : ",user)
        if(!user) {
            return res.status(404).send({ message: "Incorrect email or password" });
        }

        // create token
        const token = Jwt.sign({userID : user._id, email: user.email}, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).send({ message: "User logged in successfully", token });
    }

    async resetPasscode(req, res) {
        const { newPassword } = req.body;
        const userId = req.userId;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log(hashedPassword)
        // const newUser = { name, email, password: hashedPassword, userType };
        const userPassChanged = await userRepository.resetPassword(userId,hashedPassword);
        console.log("changed Pass : ",userPassChanged)
        if(!userPassChanged) {
            return res.status(400).send({ message: "Password not changed" });
        }
        return res.status(201).send({ message: "Password changed successfully" });
    }

    async getAllUsers(req, res) {
        const users = await userRepository.getAllUsers()
        console.log("users : ",users)
        res.status(200).send(users);
    }
}