import { Router } from "express";
import { createBlog, updateBlog, deleteBlog, getAllBlogs, getAllBlogsPublic, getBlogById } from "../controllers/blog.controller.js";
import { isLoggedIn, authorize } from "../middlewares/auth.middleware.js";
import authRoles from "../utils/authRoles.js";

const router = Router();

// Get Blog By ID Public
router.get('/:id', getBlogById);

// Get All Blogs Public
router.get('/all', getAllBlogsPublic);

// Get All Blogs of User
router.get('/user', isLoggedIn, authorize(authRoles.USER), getAllBlogs);

// Create New Blog
router.post('/create', isLoggedIn, authorize(authRoles.USER), createBlog);

// Update Blog
router.put('/update/:id', isLoggedIn, authorize(authRoles.USER), updateBlog);

// Delete Blog
router.delete('/delete/:id', isLoggedIn, authorize(authRoles.USER), deleteBlog);

export default router;