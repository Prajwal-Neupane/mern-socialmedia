import UserModel from "../Models/userModel.js";

// Get all Users

export const getAllUser = async (req, res) => {
  const response = await UserModel.find();
  res.json(response);
};

// Get a User
export const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (user) {
    const { password, ...otherDetails } = user._doc;
    res.json(otherDetails);
  } else {
    res.json("User not found");
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  if (user) {
    const response = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(response);
  } else {
    res.json("user doesn't exists");
  }
};
// delete A user

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const response = await UserModel.findByIdAndDelete(id);

  res.json(response);
};

// Follow a user

export const followUser = async (req, res) => {
  // The user to whom the user wants to follow
  const { id } = req.params;
  // The user who is following the user
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.json("Action Forbidden");
  } else {
    const followUser = await UserModel.findById(id);
    const followingUser = await UserModel.findById(currentUserId);

    if (!followUser.followers.includes(currentUserId)) {
      await followUser.updateOne({ $push: { followers: currentUserId } });
      await followingUser.updateOne({ $push: { following: id } });
      res.json("User Followed");
    } else {
      res.json("User is already followed by you");
    }
  }
};

// Unfollow a User
export const unfollowUser = async (req, res) => {
  // The user to whom the user wants to follow
  const { id } = req.params;
  // The user who is following the user
  const { currentUserId } = req.body;

  if (currentUserId === id) {
    res.json("Action Forbidden");
  } else {
    const followUser = await UserModel.findById(id);
    const followingUser = await UserModel.findById(currentUserId);

    if (followUser.followers.includes(currentUserId)) {
      await followUser.updateOne({ $pull: { followers: currentUserId } });
      await followingUser.updateOne({ $pull: { following: id } });
      res.json("User UnFollowed");
    } else {
      res.json("User is not followed by you");
    }
  }
};
