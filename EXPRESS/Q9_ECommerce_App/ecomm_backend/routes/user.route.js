import { Router } from "express";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../middlewares/auth.middleware.js";
import { updateUser, deleteUser, getUser, getAllUsers, getUserStats } from "../controllers/user.controller.js";

const router = Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateUser);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, getUser);

//GET ALL USER
router.get("/", verifyTokenAndAdmin, getAllUsers);

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, getUserStats);

export default router;