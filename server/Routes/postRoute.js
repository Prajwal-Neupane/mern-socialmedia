import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getOnePost,
  getTimelinePost,
  likePost,
  updatePost,
} from "../Controllers/PostController.js";

const router = express.Router();

export default router;

router.post("/", createPost);
router.get("/:id", getOnePost);
router.get("/", getAllPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.put("/like/:id", likePost);
router.get("/:id/timeline", getTimelinePost);
