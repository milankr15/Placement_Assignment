import { Router }  from "express";
import { processPayment } from "../controllers/stripe.controller.js";

const router = Router();

router.post("/payment", processPayment);

export default router;