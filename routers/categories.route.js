// categories.route.js
const express = require("express");
const { createCategory, getAllCategories, getCategoryById, getCategoryByStrCategory, updateCategory, deleteCategory } = require("../controllers/categories.controller");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const router = express.Router();

//user can view
router.get("/", getAllCategories);
router.get("/:idCategory", getCategoryById);
router.get("/name/:strCategory", getCategoryByStrCategory);

//admin changable
router.post("/", authMiddleware ,adminMiddleware, createCategory);
router.put("/:idCategory", authMiddleware,adminMiddleware, updateCategory);
router.delete("/:idCategory",authMiddleware, adminMiddleware, deleteCategory);

module.exports = router;
