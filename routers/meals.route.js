const express = require("express");
const { getAllMeals, createMeal, searchMeals } = require("../controllers/meals.contoller");
const { authMiddleware , adminMiddleware } = require("../middleware/auth");

const router = express.Router();


router.post("/",authMiddleware,adminMiddleware, createMeal);


router.get("/all",authMiddleware, getAllMeals);
router.get("/search",authMiddleware, searchMeals);

module.exports = router;
