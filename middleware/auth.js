const jwt = require('jsonwebtoken');
const secret = "secretGPA";

const authenticateJwt = (req, res, next) => {
    console.log('----headers-----')
    console.log(req.headers);
    console.log('----headers-----')
    const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIiLCJwYXNzd29yZCI6InBhc3NzIiwiaWF0IjoxNzA1MTU0OTExLCJleHAiOjE3MDUxNjU3MTF9.8TXx_fRS8y9birN4rmOKfdBvbjIxeUDso-lGL4So2CE';
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log('We are here inside the auth middleware.\nToken: ' + token);
        jwt.verify(token, secret, (err, user) => {
            console.log(user);
            if (err) {
                return res.status(300).json({ message: "There is something wrong" });;
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { secret, authenticateJwt }
