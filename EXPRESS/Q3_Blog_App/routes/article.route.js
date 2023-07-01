import { Router } from 'express';
import { createArticle, deleteArticle, updateArticle, getAllArticles, getAllArticlesPublic, getArticleById } from '../controllers/article.controller.js';
import { isLoggedIn, authorize } from '../middlewares/auth.middleware.js';
import authRoles from '../utils/authRoles.js';

const router = Router();

// Get Article By ID Public
router.get('/:id', getArticleById);

// Get All Articles Public
router.get('/all', getAllArticlesPublic);

// Get All Articles of User
router.get('/user', isLoggedIn, authorize(authRoles.USER), getAllArticles);

// Create New Article
router.post('/create', isLoggedIn, authorize(authRoles.USER), createArticle);

// Update Article
router.put('/update/:id', isLoggedIn, authorize(authRoles.USER), updateArticle);

// Delete Article
router.delete('/delete/:id', isLoggedIn, authorize(authRoles.USER), deleteArticle);

export default router;