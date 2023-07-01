import * as argon2 from "argon2";
import User from "../models/user.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";

export const updateUser = asyncHandler(async (req, res) => {
    if (req.body.userId !== req.params.id && !req.body.isAdmin) {
        throw new CustomError(403, "You can only update your account");
    }
    
    if (req.body.password) {
        req.body.password = await argon2.hash(req.body.password);
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
    );

    if (!updatedUser) {
        throw new CustomError(404, "User not found");
    }

    res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {
    if (req.body.userId !== req.params.id && !req.body.isAdmin) {
        throw new CustomError(403, "You can only delete your account");
    }

    const user = await User.findById(req.params.id);

    if (!user) {
        throw new CustomError(404, "User not found");
    }

    await user.remove();
    res.status(200).json("User has been deleted...");
});

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        throw new CustomError(404, "User not found");
    }

    user.password = undefined;
    res.status(200).json({ user: user });
});

export const getAllUsers = asyncHandler(async (req, res) => {
    const query = req.query.new;
    const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();

    if (!users) {
        throw new CustomError(404, "Users not found");
    }

    res.status(200).json(users);
});

export const getUserStats = asyncHandler(async (_req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" }
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            },
        },
    ]);

    if (!data) {
        throw new CustomError(404, "User stats not found");
    }
    
    res.status(200).json(data);
});