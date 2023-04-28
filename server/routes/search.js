import express from "express";
import { findMembers } from "../controllers/search.js";
import auth from "./../middleware/auth.js";
const router = express.Router();

router.get("/members", auth, findMembers);
export default router;
