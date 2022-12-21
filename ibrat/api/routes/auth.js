const router = require("express").Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


// create a new user
router.post("/add", async (req, res) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, "SECRET_KEY"),
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);

    }
});

// login a user
router.post("/login", async (req, res) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json("User Not Found");
    }

    try {
        // console.log("reach");
        const hashedPassword = CryptoJS.AES.decrypt(user.password, "SECRET_KEY");
        const Origialpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if (Origialpassword != req.body.password) {
            return res.status(401).json("Wrong Password");
        }
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "SECRET_KEY");

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (error) {
        return res.status(500).json(error);
    }

})



module.exports = router;