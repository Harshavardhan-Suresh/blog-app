import express from "express";
import { addBlog, deleteBlog, getAllBlogs, getBlogById, getByUserID, updateBlog } from "../controllers/blog-controller";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get('/:id', getBlogById);
blogRouter.get("/user/:id", getByUserID);
blogRouter.post("/add", addBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.delete("/:id", deleteBlog);
export default blogRouter;