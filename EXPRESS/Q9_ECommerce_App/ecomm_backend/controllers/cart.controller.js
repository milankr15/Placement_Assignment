import Cart from "../models/cart.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";

export const createCart = asyncHandler(async (req, res) => {
    const { userId, products } = req.body;

    if (!userId || !products || products.length === 0 || userId === "" || products === []) {
        throw new CustomError("Please fill in all Cart Details", 400);
    }

    const newCart = await Cart.create({ userId, products });
    res.status(200).json(newCart);
});

export const updateCart = asyncHandler(async (req, res) => {
    const { userId, products } = req.body;

    if (!userId || !products || products.length === 0 || userId === "" || products === []) {
        throw new CustomError("Please fill in all Cart Details", 400);
    }

    const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
            $set: { userId, products }
        },
        { new: true }
    );
    res.status(200).json(updatedCart);
});

export const deleteCart = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const cart = await Cart.findById(id);

    if (!cart) {
        throw new CustomError("Cart not found!", 404);
    }

    await cart.remove();
    res.status(200).json("Cart has been deleted...");
});

export const getUserCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
        throw new CustomError("Cart not found!", 404);
    }

    res.status(200).json(cart);
});

export const getAllCarts = asyncHandler(async (_req, res) => {
    const carts = await Cart.find();

    if (!carts) {
        throw new CustomError("Carts not found!", 404);
    }

    res.status(200).json(carts);
});