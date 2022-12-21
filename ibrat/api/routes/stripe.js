const router = require("express").Router();
const stripe = require("stripe")("sk_test_51MG1EjSEcoDUzKMhKlDqpZe2nx9oqWmO1tpJTXuOATWSHvmY05q6GEZTaENdyJOyFslUA3zO0n6PhtFZRk3HnnO800q9NKb0MN");

router.post("/payment", (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;