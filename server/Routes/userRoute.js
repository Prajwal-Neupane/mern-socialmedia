import express from "express";
import {
  deleteUser,
  followUser,
  getAllUser,
  getUser,
  unfollowUser,
  updateUser,
} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.get("/", getAllUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

export default router;
