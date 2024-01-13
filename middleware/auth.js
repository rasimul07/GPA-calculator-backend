const jwt = require('jsonwebtoken');
const secret = "secretGPA";

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.Authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log('We are here inside the auth middleware.\nToken: '+token);
        jwt.verify(token, secret, (err, user) => {
            console.log(user);
            if (err) {
                return res.status(300).json({ message: "Authentication failed" });;
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {secret,authenticateJwt}
