import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  sharePost,
  likeGroupPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/share/:id", auth, sharePost);
router.patch("/like-post/:id", auth, likeGroupPost);

export default router;
