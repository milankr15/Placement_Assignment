import Product from '../models/product.schema.js';
import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/customError.js';

export const createProduct = asyncHandler(async (req, res) => {
    const { title, desc, img, categories, size, color, price } = req.body;

    if (!title || !desc || !img || !categories || categories.length === 0 || !size || !color || !price) {
        throw new CustomError("Please fill in all Product Details", 400);
    }

    const newProduct = await Product.create({ title, desc, img, categories, size, color, price });
    res.status(200).json(newProduct);
});

export const updateProduct = asyncHandler(async (req, res) => {
    const { title, desc, img, categories, size, color, price } = req.body;

    if (!title || !desc || !img || !categories || categories.length === 0 || !size || !color || !price) {
        throw new CustomError("Please fill in all Product Details", 400);
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true }
    );

    if (!updatedProduct) {
        throw new CustomError("Product not found", 404);
    }

    res.status(200).json(updatedProduct);
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new CustomError("Product not found", 404);
    }

    await product.remove();
    res.status(200).json("Product has been deleted...");
});

export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new CustomError("Product not found", 404);
    }

    res.status(200).json(product);    
});

export const getAllProducts = asyncHandler(async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    
    let products;

    if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
        products = await Product.find({
            categories: {
                $in: [qCategory],
            },
        });
    } else {
        products = await Product.find();
    }

    if (products.length === 0) {
        throw new CustomError("Products not found", 404);
    }

    res.status(200).json(products);
});