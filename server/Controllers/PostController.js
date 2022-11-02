import mongoose from "mongoose";
import PostModel from "../Models/postModel.js";

import UserModel from "../Models/userModel.js";

export const createPost = async (req, res) => {
  const post = new PostModel(req.body);
  const response = await post.save();
  res.json(response);
};

export const getOnePost = async (req, res) => {
  const { id } = req.params;
  const response = await PostModel.findById(id);
  res.json(response);
};

export const getAllPost = async (req, res) => {
  const response = await PostModel.find();
  res.json(response);
};

// Delete code will also be same as update Post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const response = await PostModel.findByIdAndDelete(id);
  res.json(response);
};

export const updatePost = async (req, res) => {
  const { id } = req.params; //postId
  const { userId } = req.body;
  const post = await PostModel.findById(id);
  if (post.userId === userId) {
    const response = await PostModel.updateOne({ $set: req.body });
    res.json(response);
  } else {
    res.json("Action forbidden");
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const post = await PostModel.findById(id);

  if (!post.likes.includes(userId)) {
    await post.updateOne({ $push: { likes: userId } });
    res.json("Post liked");
  } else {
    await post.updateOne({ $pull: { likes: userId } });
    res.json("Post unliked");
  }
};

export const getTimelinePost = async (req, res) => {
  const { userId } = req.params;

  const currentUserPosts = await PostModel.find({ userId: userId });
  const followingPosts = await UserModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "following",
        foreignField: "userId",
        as: "followingPosts",
      },
    },
    {
      $project: {
        followingPosts: 1,
        _id: 0,
      },
    },
  ]);
  res
    .json(currentUserPosts.concat(...followingPosts[0].followingPosts))
    .sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
};
