// /routers/carts.route.js
const express = require("express");
const { addToCart, getCart } = require("../controllers/carts.controller");

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getCart);

module.exports = router;
