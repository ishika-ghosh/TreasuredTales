import express from "express";
import {
  createGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
} from "../controllers/group.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllGroups);
router.post("/", auth, createGroup);
router.patch("/:id", auth, updateGroup);
router.delete("/:id", auth, deleteGroup);

export default router;
