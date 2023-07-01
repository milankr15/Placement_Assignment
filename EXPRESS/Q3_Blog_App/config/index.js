import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/crudblog',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: parseInt(process.env.JWT_EXPIRY) || 86400000
}

export default config;