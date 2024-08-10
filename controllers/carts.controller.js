const { Cart } = require("../model/carts.model");
const mongoose = require("mongoose");

async function addToCart(req, res) {
  const { userId, mealId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const mealObjectId = mongoose.Types.ObjectId(mealId); // Convert mealId to ObjectId

    const existingItem = cart.items.find(item => item.mealId.equals(mealObjectId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ mealId: mealObjectId, quantity });
    }

    cart.total = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(`Error adding to cart: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
}


async function getCart(req, res) {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.mealId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(`Error fetching cart: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateCartItem(req, res) {
  const { userId, mealId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const item = cart.items.find(item => item.mealId.toString() === mealId);
    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    item.quantity = quantity;
    cart.total = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(`Error updating cart item: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function removeCartItem(req, res) {
  const { userId, mealId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.mealId.toString() !== mealId);
    cart.total = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(`Error removing cart item: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function clearCart(req, res) {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(`Error clearing cart: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { addToCart, getCart, updateCartItem, removeCartItem, clearCart };
