const express = require("express");
const { getAllUsers } = require("../controllers/users.controller");
const {authMiddleware, adminMiddleware } = require("../middleware/auth");

const router = express.Router();

router.get("/",authMiddleware, adminMiddleware,getAllUsers);

module.exports = router;
