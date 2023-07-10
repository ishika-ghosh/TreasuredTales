import express from "express";
import auth from "../middleware/auth.js";
import {
  addOrRemoveFavourite,
  getAllEditorAccessPosts,
  getAllSharedPosts,
  getAllViewerAccessPosts,
} from "../controllers/sharePost.js";

const router = express.Router();

router.get("/", auth, getAllSharedPosts);
router.patch("/:id", auth, addOrRemoveFavourite);
router.get("/editor-access", auth, getAllEditorAccessPosts);
router.get("/viewer-access", auth, getAllViewerAccessPosts);

export default router;
