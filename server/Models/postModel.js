import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: String,
    likes: [],
    image: String,
  },
  { timestamps: true }
);

const PostModel = mongoose.model("posts", postSchema);

export default PostModel;
