// /models/cart.model.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  items: [{
      mealId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Meal',
          required: true
      },
      quantity: {
          type: Number,
          required: true,
          min: 1
      }
  }],
  total: {
      type: Number,
      required: true,
      default: 0
  }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
