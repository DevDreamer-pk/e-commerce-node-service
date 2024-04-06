import Jwt from "jsonwebtoken";
const jwtAuth = (req,res, next) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).send('No Token Found');
    }
    try{
        const payload = Jwt.verify(token, 'Abcdefg');
        req.userId = payload.userID;
    }catch(err){
        return res.status(401).send('Unauthorized token');
    }
    next();
}

export default jwtAuth;