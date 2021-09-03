const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const tokenArr = token.split(' ');
        if (tokenArr[1].length < 12 && tokenArr[0] === 'user_token'){
            req.randomString = tokenArr[1];
        }
        else if (tokenArr[1].length >= 12 && tokenArr[0] === 'user_token') {
            const decoded = jwt.verify(tokenArr[1], config.TOKEN_KEY);
            req.user_email = decoded.email;
        }

    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;