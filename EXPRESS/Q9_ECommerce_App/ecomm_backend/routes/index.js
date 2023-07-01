import { Router } from "express";

import authRoutes from "./auth.route.js";
import cartRoutes from "./cart.route.js";
import orderRoutes from "./order.route.js";
import productRoutes from "./product.route.js";
import userRoutes from "./user.route.js";
import stripeRoutes from "./stripe.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/checkout", stripeRoutes);

export default router;