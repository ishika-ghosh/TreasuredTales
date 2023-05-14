import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  sharePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/share/:id", auth, sharePost);

export default router;
