import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/shop",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY || 604800000,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
};

export default config;