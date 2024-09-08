// ========= This is a middle ware file ===========

// import jwt token 
const jwt = require('jsonwebtoken');

// initialise jwt secret for signing the token
const JWT_SECRET = 'Aliisagood$boy';

// in middle ware three parameters are used req, res and next this is because when req and res finishes then the next runs which contintue the exectuion of the programm

const fetchuser = (req, res, next) => {

    // Get the user from jwt token and add id to req obj because we will send the auth token in the header
    const token = req.header('auth-token');

    // if token is not vaild tell the user that your token is not vaild
    if (!token) {
        res.status(401).send({ error: "please authenticate using a vaild token" })
    }

    // if the token is vaild then execute the following code
    try {

        // Now check and verify weather the token in the header is signed by the secret key or not and if signed then it decode the token
        const data = jwt.verify(token, JWT_SECRET);

        // after decoding assign the user of the token to the req.user re.user is the person who has requested
        req.user = data.user;

        // Now the next code of the auth.js will be executed
        next();

    } catch (error) {
        res.status(401).send({ error: "please authenticate using a vaild token" })
    }

}

module.exports = fetchuser;