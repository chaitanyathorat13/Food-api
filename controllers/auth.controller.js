const { User } = require("../model/users.model");
const { Counter } = require("../model/counter.model");
const jwt = require("jsonwebtoken");

async function getNextSequenceValue(sequenceName) {
  const counter = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
}

async function registerUser(req, res) {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const userId = await getNextSequenceValue("userId");

    const user = new User({ _id: userId, username, email, password, role });
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, "your_jwt_secret");
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    console.error(`Error registering user: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, "your_jwt_secret");
    res.status(200).json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error(`Error logging in user: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { registerUser, loginUser };
