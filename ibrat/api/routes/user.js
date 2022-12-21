const router = require("express").Router();
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../verifyToken");
const CryptoJS = require("crypto-js");

// updating the user data
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    if (req.body.password) {

        req.body.password = CryptoJS.AES.encrypt(req.body.password, "SECRET_KEY").toString();

    }

    try {

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

})


// delete a account
router.delete("/:id", verifyTokenAndAuthorization, async (req, res, next) => {

    try {

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account Deleted");

    } catch (error) {
        return res.status(500).json(error);
    }


})

// get user
router.get("/find/:id", verifyTokenAndAdmin, async (req, res, next) => {

    try {
        const user = await User.findById(req, params.id);

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others });
    } catch (error) {
        return res.status(500).json(error);
    }

})

// get all users with queries 
router.get("/", verifyTokenAndAdmin, async (req, res, next) => {


    const query = req.query.new;

    try {

        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json(error);
    }

})


// user stats

router.get("/stats", verifyTokenAndAdmin, (req, res) => {

    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = User.aggregate([

            { $match: { createdAt: { $gte: lastyear } } },
            {
                $project: {

                    month: { $month: "$createdAt" },

                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            }
        ])
        res.status(200).json(data);

    } catch (error) {
        return res.status(500).json(error);
    }

})



module.exports = router;