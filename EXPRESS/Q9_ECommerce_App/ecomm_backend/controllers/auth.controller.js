import * as argon2 from "argon2";
import User from "../models/user.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new CustomError("Please fill in all fields", 400);
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new CustomError("User already exists", 400);
    }

    const newUser = await User.create({
        username: username,
        email: email,
        password: argon2.hash(password, { type: argon2.argon2id })
    });

    res.status(201).json(newUser);
});

export const login = async (req, res) => {
    const user = await User.findOne(
        {
            email: req.body.username
        }
    );

    if (!user) {
        throw new CustomError("Wrong User Name", 401);
    }

    const validPassword = await argon2.verify(user.password, req.body.password);

    if (!validPassword) {
        throw new CustomError("Wrong Password", 401);
    }

    const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
};