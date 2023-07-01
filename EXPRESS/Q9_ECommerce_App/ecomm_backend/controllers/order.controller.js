import Order from "../models/order.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";

export const createOrder = asyncHandler(async (req, res) => {
    const { userId, products, amount, address } = req.body;

    if (!userId || !products || products.length === 0 || userId === "" || !amount || !address) {
        throw new CustomError("Please fill in all Order Details", 400);
    }

    const newOrder = await Order.create({ userId, products, amount, address });

    res.status(200).json(newOrder);
});

export const updateOrder = asyncHandler(async (req, res) => {
    const { userId, products, amount, address } = req.body;

    if (!userId || !products || products.length === 0 || userId === "" || !amount || !address) {
        throw new CustomError("Please fill in all Order Details", 400);
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
            $set: { userId, products, amount, address }
        },
        { new: true }
    );
    res.status(200).json(updatedOrder);
});

export const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new CustomError("Order not found!", 404);
    }

    await order.remove();
    res.status(200).json("Order has been deleted...");
});

export const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ userId: req.params.userId });

    if (!orders) {
        throw new CustomError("No Orders Found!", 404);
    }

    res.status(200).json(orders);
});

export const getAllOrders = asyncHandler(async (_req, res) => {
    const orders = await Order.find();
    if (!orders) {
        throw new CustomError("No Orders Found!", 404);
    }
    res.status(200).json(orders);
});

export const getMonthlyIncome = asyncHandler(async (_req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            },
        },
    ]);
    res.status(200).json(income);
});