import express from "express";
import {
  createGroup,
  getAllGroups,
  renameGroup,
  deleteGroup,
  addtoGroup,
  removefromGroup,
  transferownershipofGroup,
  getGroupDetails,
} from "../controllers/group.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllGroups);
router.post("/", auth, createGroup);
router.patch("/:id", auth, renameGroup);
router.delete("/:id", auth, deleteGroup);
router.patch("/addtogroup/:id", auth, addtoGroup);
router.patch("/removefromgroup/:id", auth, removefromGroup);
router.patch("/transferownership/:id", auth, transferownershipofGroup);
router.get("/:id", auth, getGroupDetails);

export default router;
