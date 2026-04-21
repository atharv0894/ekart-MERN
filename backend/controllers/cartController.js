import Cart from "../models/cartModel.js";
import { Product } from "../models/productModel.js"; // ✅ named export

export const getCart = async (req, res) => {
  try {
    const userId = req.id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.productId",
    ); // ✅ findOne by user field
    if (!cart) {
      return res.status(404).json({ success: true, cart: [] });
    }
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId }); // ✅ Fetch cart before checking

    if (!cart) {
      cart = new Cart({
        // ✅ let/no-const so cart is accessible later
        user: userId,
        items: [{ productId, quantity: 1, price: product.price }], // ✅ product.price not productPrice
        totalAmount: product.price,
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId,
      );
      if (itemIndex !== -1) {
        cart.items[itemIndex].quantity++;
      } else {
        cart.items.push({ productId, quantity: 1, price: product.price });
      }
      cart.totalAmount = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate(
      "items.productId",
    );
    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, type } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" }); // ✅ Return error instead of creating new cart
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );
    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" }); // ✅ Return error instead of adding item
    }

    if (type === "increment") {
      cart.items[itemIndex].quantity++;
    } else if (type === "decrement") {
      cart.items[itemIndex].quantity--;
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid type, use 'increment' or 'decrement'",
      }); // ✅ Handle invalid type
    }

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate(
      "items.productId",
    );
    res
      .status(200)
      .json({ success: true, message: "Cart updated", cart: populatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );
    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate(
      "items.productId",
    );
    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: populatedCart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
