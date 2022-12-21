const router = require("express").Router();
const { json } = require("express");
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("../verifyToken");


// add a new product
router.post("/add", verifyTokenAndAdmin, async (req, res) => {

    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }

})


// update a product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updatedProduct);

    } catch (error) {
        return res.status(500).json(error);
    }

})

// remove a product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        await Product.findByIdAndDelete(req.param.id);
        res.status(200).json("Product Removed");
    } catch (error) {
        return res.status(500).json(error);
    }
})


// get a particular product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
})

// get all products

router.get("/", async (req, res) => {

    // let products = [];
    const qNew = req.query.new;
    const qCategory = req.query.category;

    let products;

    try {

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5);
        }
        else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                },
            });
        }
        else {
            products = await Product.find();
        }
        res.status(200).json(products);

    } catch (error) {
        console.log(error);
        return res.status(500).json("Error occured !!");
    }
})




module.exports = router;