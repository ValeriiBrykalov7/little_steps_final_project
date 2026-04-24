import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

export const getCurrentUserController = (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully found current user',
    data: req.user,
  });
};

export const updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCloudinary(req.file.buffer);

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: result.secure_url },
    { returnDocument: "after" },
  );

  res.status(200).json({ url: user.avatar });
};

export const updateUserInfo = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    req.body,
    { returnDocument: "after" },
  );

  if(!user) throw createHttpError(404, 'User not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully updated user info',
    data: user,
  });
};
