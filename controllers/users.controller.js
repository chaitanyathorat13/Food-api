const { User } = require("../model/users.model");

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getAllUsers };
