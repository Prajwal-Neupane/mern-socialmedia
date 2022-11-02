import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registering a new User

export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  const newUser = new UserModel(req.body);
  const { username } = req.body;
  const oldUser = await UserModel.findOne({ username });

  if (oldUser) {
    return res.json("Username is already taken");
  } else {
    const user = await newUser.save();
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.json({ user, token });
  }

  // try {
  //   await newUser.save();
  //   res.status(200).json(newUser);
};

// User login

export const userLogin = async (req, res) => {
  const { username, password } = req.body;

  // try {
  //   const user = await UserModel.find({ username: username });
  //   if (user) {
  //     const validity = await bcrypt.compare(password, user.password);

  //     validity ? res.json(user) : res.json("Password is wrong");
  //   } else {
  //     res.send("Incorrect username");
  //   }
  // } catch (error) {
  //   res.send({ message: error.message });
  // }
  const user = await UserModel.findOne({ username: username });

  if (user) {
    const validity = await bcrypt.compare(password, user.password);
    if (!validity) {
      res.json("Wrong password");
    } else {
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.json({ user, token });
    }
  } else {
    res.json("User not registered");
  }
};
