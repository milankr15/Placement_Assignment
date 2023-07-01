import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";
import stripe from "../config/stripe.config.js";

export const processPayment = asyncHandler(async (req, res) => {
    await stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                throw new CustomError(stripeErr, 500);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});