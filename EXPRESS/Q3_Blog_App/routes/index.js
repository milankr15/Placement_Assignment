import { Router } from 'express';
import authRoutes from './auth.route.js';
import blogRoutes from './blog.route.js';
import articleRoutes from './article.route.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);
router.use('/articles', articleRoutes);

export default router;