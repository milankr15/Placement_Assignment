import { Router } from "express";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../middlewares/auth.middleware.js";
import { createOrder, updateOrder, deleteOrder, getUserOrders, getAllOrders, getMonthlyIncome } from "../controllers/order.controller.js";

const router = Router();

//CREATE
router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrders);

//GET ALL
router.get("/", verifyTokenAndAdmin, getAllOrders);

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

export default router;