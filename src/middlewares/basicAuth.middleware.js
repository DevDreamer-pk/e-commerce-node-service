import { UserModel } from "../features/user/user.model.js";
const basicAuthorizer = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }

    const base64Credentials = authHeader.replace('Basic ', '');
    // console.log("Base 64 credentials",base64Credentials);

    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    // console.log("Decoded credentials",decodedCredentials); 
 // [email:password]
    const cred = decodedCredentials.split(':');

    const user = UserModel.getAll().find(user => user.email == cred[0] && user.password == cred[1]);
    if(user) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

export default basicAuthorizer;