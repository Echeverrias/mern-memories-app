import jwt from 'jsonwebtoken';

// The auth middleware confirm or deny the requests

const auth = async(req, res, next) => {
    console.log('auth middleware');
    try{
        // In the backend the headers properties are in lower case always!!!
        const token = req.headers.authorization.split(" ")[1]; //[0] === 'Bearer'
        // The token could be own or google
        const isCustomAuth = token.length < 500;
        let decodeData;
        if (token && isCustomAuth){
            decodeData = jwt.verify(token, 'secret');
            req.userId = decodeData && decodeData.id;
        }else{
            decodeData = jwt.decode(token);
            req.userId = decodeData && decodeData.sub;
        }
        next();
    }
    catch(error){
        console.log(error);
    }
}

export default auth;
