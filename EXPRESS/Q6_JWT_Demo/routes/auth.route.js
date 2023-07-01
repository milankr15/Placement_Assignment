import { Router } from 'express';
import { login, logout, signUp } from "../controllers/auth.controller.js";

const router = Router();

// Sign up
router.post("/signup", signUp);

// Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

export default router;