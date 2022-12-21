const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ritesh:ritesh@cluster0.psdjroq.mongodb.net/?retryWrites=true&w=majority",)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));


app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/checkout", stripeRoute);


app.listen("8000", () => {
    console.log("Server started on port http://localhost:8000/");
})
