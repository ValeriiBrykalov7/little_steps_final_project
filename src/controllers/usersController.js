import { User } from '../models/user.js';

export const getCurrentUserController = (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully found current user',
    data: req.user,
  });
};

export const updateTheme = async (req, res) => {
  const { theme } = req.body;
  const userId = req.user._id;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { theme },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    theme: updatedUser.theme,
  });
};
