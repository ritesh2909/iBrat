const router = require("express").Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../verifyToken");

// add to cart
router.post("/add", verifyToken, async (req, res) => {

    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        return res.status(500).json(error);
    }

})

// update cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json(updatedCart);
    } catch (error) {
        return res.status(500).json(error);
    }
})

// delete cart
router.delete("/id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Item removed from cart");

    } catch (error) {
        return res.status(500).json(error);
    }
})

// all the cart items
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {

    try {

        const cart = await Cart.findOne({ userId: req.params.id });
        res.status(200).json(cart);

    } catch (error) {
        return res.status(500).json(error);
    }
})

// get all carts - only for admins
router.get("/", verifyTokenAndAdmin, async (req, res) => {

    try {

        const carts = await Cart.find();
        res.status(200).json(carts);

    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;