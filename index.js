const express = require("express");
const app = express();
const connectToMongoDB = require("./connection");
const mealRouter = require("./routers/meals.route");
const userRouter = require("./routers/users.route");
const categoryRouter = require("./routers/categories.route");
const cartRouter = require("./routers/carts.route");
const authRouter = require("./routers/auth.route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectToMongoDB()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((error) => {
    console.log("Not connected", error);
  });

app.use("/api/crt/meals", mealRouter);
app.use("/api/crt/users", userRouter);
app.use("/api/crt/categories", categoryRouter);
app.use("/api/crt/carts", cartRouter);
app.use("/api/crt/auth", authRouter);

const port = 8001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
