import Blog from "../models/blog.schema.js";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/customError.js";

/**********************************************************
 * @CREATE_BLOG
 * @route https://localhost:5000/api/blogs/
 * @description Controller used for creating a new blog
 * @description Only user can create the blog
 * @returns Blog Object with available Blog in DB with Success Message
 *********************************************************/

export const createBlog = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        throw new CustomError("Blog Name is required", 400);
    }

    const blog = await Blog.create({
        name,
        user: req.user._id
    });

    res.status(200).json({
        success: true,
        message: "Blog Created Successfully",
        blog: blog
    });
});

/**
 * @UPDATE_BLOG
 * @route http://localhost:5000/api/blogs/:blogId
 * @description Controller for updating the blog details
 * @description Only User can update the blog
 * @returns Updated Blog Object
 */

export const updateBlog = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const { id: blogId } = req.params;

    if (!title) {
        throw new CustomError("Blog Name is required", 400);
    }

    const blog = await Blog.findById(blogId);

    if (!blog || blog.user.toString() !== req.user._id.toString()) {
        throw new CustomError("You are not authorized to update this blog", 401);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(articleId, {
        name
    }, { new: true });

    if (!updatedBlog) {
        throw new CustomError("Blog Not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Blog Updated Successfully",
        blog: updatedBlog
    });
});

/**
 * @DELETE_BLOG
 * @route http://localhost:5000/api/blogs/:blogId
 * @description Controller for deleting the blog
 * @description Only User can delete the blog
 * @returns Success Message
 */

export const deleteBlog = asyncHandler(async (req, res) => {
    const { id: blogId } = req.params;
    const blogToDelete = await Blog.findById(blogId);

    if (!blogToDelete || blogToDelete.user.toString() !== req.user._id.toString()) {
        throw new CustomError("You are not authorized to delete this blog", 401);
    }

    if (!blogToDelete) {
        throw new CustomError("Blog not found", 404);
    }

    blogToDelete.remove();
    res.status(200).json({
        success: true,
        message: "Blog has been deleted successfully"
    });
});

/**
 * @GET_ALL_BLOGS_USER
 * @route http://localhost:5000/api/blogs/all
 * @description Controller for getting all blogs of a user
 * @description Only User can get all own blogs list
 * @returns Article Object with available blogs in DB
 */

export const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({ user: req.user._id });

    if (blogs.length <= 0) {
        throw new CustomError("No Blogs found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Get All Blogs Success",
        blogs: blogs
    });
});

/**
 * @GET_ALL_BLOGS_PUBLIC
 * @route http://localhost:5000/api/article/all
 * @description Controller for getting all articles of a user
 * @description Only User can get all articles list
 * @returns Article Object with available Article in DB
 */

export const getAllBlogsPublic = asyncHandler(async (_req, res) => {
    const blogs = await Blog.find({});

    if (blogs.length <= 0) {
        throw new CustomError("No Blogs found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Get All Articles Success",
        blogs: blogs
    });
});

/**
 * @GET_BLOG_BY_ID_PUBLIC
 * @route http://localhost:5000/api/blogs/:blogId
 * @description Controller for getting blog by ID
 * @description Public access
 * @returns Article Object with available Article in DB
 */

export const getBlogById = asyncHandler(async (req, res) => {
    const { id: blogId } = req.params;

    const blog = await Blog.findById(blogId).populate("articles user");

    if (!blog) {
        throw new CustomError("Blog not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "Get Blog by ID Success",
        blog: blog
    });
});