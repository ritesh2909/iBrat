const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    const authHeader = req.headers.token;
    if (authHeader) {

        const token = authHeader.split(" ")[1];
        jwt.verify(token, "SECRET_KEY", (err, user) => {

            if (err) return res.status(403).json("Invalid Token");

            req.user = user;
            next();
        })
    }
    else {
        return res.status(401).json("You are not Authenricated !");
    }


}

const verifyTokenAndAuthorization = (req, res, next) => {

    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || user.isAdmin) {
            next();
        }
        else {
            return res.status(401).json("Not Allowed !!");
        }
    })

}
const verifyTokenAndAdmin = (req, res, next) => {

    verifyToken(req, res, () => {
        if (user.isAdmin) {
            next();
        }
        else {
            return res.status(401).json("Not Allowed !!");
        }
    })

}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };