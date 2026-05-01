import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { sendVerificationEmail } from '../services/mailer.service.js';
import { randomBytes } from 'crypto';
export const getCurrentUserController = (req, res) => {
  res.status(200).json(req.user);
};

export const updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCloudinary(req.file.buffer);

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: result.secure_url },
    { returnDocument: 'after' },
  );

  res.status(200).json({ url: user.avatar });
};

export const updateUserInfo = async (req, res) => {
  const { email, ...rest } = req.body;

  // оновлюємо всі поля крім email
  const user = await User.findByIdAndUpdate(req.user._id, rest, {
    returnDocument: 'after',
  });

  if (!user) throw createHttpError(404, 'User not found');

  // якщо email не змінюється — відповідаємо одразу
  if (!email || email === user.email) {
    return res.status(200).json(user);
  }

  // перевірка чи email вже зайнятий
  const emailTaken = await User.findOne({ email });
  if (emailTaken) throw createHttpError(409, 'Email already in use');

  // генерація токена і збереження pending email
  const token = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 година

  await User.findByIdAndUpdate(req.user._id, {
    pendingEmail: email,
    verifyEmailToken: token,
    verifyEmailExpires: expires,
  });

  await sendVerificationEmail(email, token);

  res.status(200).json({
    ...user.toObject(),
    message: 'Check your new email to confirm the change',
  });
};

export const verifyEmailChange = async (req, res) => {
  const { token } = req.body;

  const user = await User.findOne({ verifyEmailToken: token });

  if (!user) throw createHttpError(400, 'Invalid token');

  if (user.verifyEmailExpires < new Date()) {
    throw createHttpError(400, 'Token expired');
  }

  await User.findByIdAndUpdate(user._id, {
    email: user.pendingEmail,
    pendingEmail: null,
    verifyEmailToken: null,
    verifyEmailExpires: null,
  });

  res.status(200).json({ message: 'Email successfully updated' });
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
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    theme: updatedUser.theme,
  });
};
