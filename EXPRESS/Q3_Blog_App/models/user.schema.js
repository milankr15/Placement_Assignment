import mongoose from 'mongoose';
import * as argon2 from 'argon2';
import JWT from 'jsonwebtoken';
import config from '../config/index.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [50, 'Name must be less than 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Password must be at least 8 characters'],
        select: false,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    }
}, { timestamps: true });

// Encrypt password before saving - HOOKS
userSchema.pre('save', async function (next) {
    // Only run this function if password was moddified (not on other update functions)
    if (!this.isModified('password')) return next();
    this.password = await argon2.hash(this.password);
    next();
});

//User Methods
userSchema.methods = {
    // Compare password entered by user with the hashed password in the database
    comparePassword: async function (enteredPassword) {
        return await argon2.verify(this.password, enteredPassword);
    },

    // For generating JWT Token - METHOD
    getJwtToken: function () {
        return JWT.sign({ _id: this._id, name: this.name, email: this.email, role: this.role }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY });
    }
};

export default mongoose.model("User", userSchema);