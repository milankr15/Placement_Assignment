import Article from "../models/article.schema.js";
import Blog from "../models/blog.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";

/**********************************************************
 * @CREATE_ARTICLE
 * @route https://localhost:5000/api/articles/
 * @description Controller used for creating a new article
 * @description Only user can create the article
 * @returns Article Object with available Article in DB with Success Message
 *********************************************************/

export const createArticle = asyncHandler(async (req, res) => {
    const { title, content, blogId } = req.body;

    if (!title || !content || !blogId) {
        throw new CustomError("Article Title, Content and Blog ID is required", 400);
    }

    const article = await Article.create({
        title: title,
        content: content,
        blog: blogId,
        user: req.user._id
    });

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, { $push: { articles: article._id } }, { new: true });

    res.status(200).json({
        success: true,
        message: "Article Created Successfully",
        article: article,
        blog: updatedBlog
    });
});

/**
 * @UPDATE_ARTICLE
 * @route http://localhost:5000/api/articles/:articleId
 * @description Controller for updating the article details
 * @description Only User can update the article
 * @returns Updated Article Object
 */

export const updateArticle = asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const { id: articleId } = req.params;

    if (!title || !content) {
        throw new CustomError("Article Title and Content is required", 400);
    }

    const article = await Article.findById(articleId);

    if (!article || article.user.toString() !== req.user._id.toString()) {
        throw new CustomError("You are not authorized to update this article", 401);
    }

    const updatedArticle = await Article.findByIdAndUpdate(articleId, {
        title,
        content,
    }, { new: true });

    if (!updatedArticle) {
        throw new CustomError("Article not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Article Updated Successfully",
        updatedArticle,
    });
});

/**
 * @DELETE_ARTICLE
 * @route http://localhost:5000/api/articles/:articleId
 * @description Controller for deleting the article
 * @description Only User can delete the article
 * @returns Success Message
 */

export const deleteArticle = asyncHandler(async (req, res) => {
    const { id: articleId } = req.params;
    const articleToDelete = await Article.findById(articleId);

    if (!articleToDelete || articleToDelete.user.toString() !== req.user._id.toString()) {
        throw new CustomError("You are not authorized to delete this article", 401);
    }

    if (!articleToDelete) {
        throw new CustomError("Article not found", 404);
    }

    articleToDelete.remove();

    const updatedBlog = await Blog.findByIdAndUpdate(articleToDelete.blog, { $pull: { articles: articleId } }, { new: true });

    res.status(200).json({
        success: true,
        message: "Article has been deleted successfully",
        blog: updatedBlog
    });
});

/**
 * @GET_ALL_ARTICLES_USER
 * @route http://localhost:5000/api/articles/user
 * @description Controller for getting all articles of a user
 * @description Only User can get all own articles list
 * @returns Article Object with available Article in DB
 */

export const getAllArticles = asyncHandler(async (req, res) => {
    const articles = await Article.find({ user: req.user._id }).populate("blog");

    if (articles.length <= 0) {
        throw new CustomError("No Articles found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Get All Articles Success",
        articles
    });
});

/**
 * @GET_ALL_ARTICLES_PUBLIC
 * @route http://localhost:5000/api/articles/all
 * @description Controller for getting all articles of a user
 * @description Only User can get all articles list
 * @returns Article Object with available Article in DB
 */

export const getAllArticlesPublic = asyncHandler(async (_req, res) => {
    const articles = await Article.find({});

    if (articles.length <= 0) {
        throw new CustomError("No Articles found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Get All Articles Success",
        articles
    });
});

/**
 * @GET_ARTICLE_BY_ID_PUBLIC
 * @route http://localhost:5000/api/articles/:articleId
 * @description Controller for getting article by ID
 * @description Public access
 * @returns Article Object with available Article in DB
 */

export const getArticleById = asyncHandler(async (req, res) => {
    const { id: articleId } = req.params;

    const article = await Article.findById(articleId).populate("blog user");

    if (!article) {
        throw new CustomError("Article not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Get Article by ID Success",
        article
    });
});