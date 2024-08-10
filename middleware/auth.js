const jwt = require("jsonwebtoken");
const { User } = require("../model/users.model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Authentication required" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};


module.exports = { authMiddleware, adminMiddleware };