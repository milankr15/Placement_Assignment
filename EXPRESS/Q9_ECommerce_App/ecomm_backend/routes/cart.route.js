import { Router } from "express";

import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../middlewares/auth.middleware.js";
import { createCart, updateCart, deleteCart, getUserCart, getAllCarts } from "../controllers/cart.controller.js";

const router = Router();

//CREATE
router.post("/", verifyToken, createCart);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateCart);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);

//GET ALL
router.get("/", verifyTokenAndAdmin, getAllCarts);


export default router;