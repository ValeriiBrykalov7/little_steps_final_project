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
  const { email, token, ...rest } = req.body;

  // якщо прийшов токен — верифікуємо email
  if (token) {
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

    return res.status(200).json({ message: 'Email successfully updated' });
  }

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);

    rest.avatar = result.secure_url;
  }

  // звичайне оновлення даних
  const user = await User.findByIdAndUpdate(req.user._id, rest, {
    returnDocument: 'after',
  });

  if (!user) throw createHttpError(404, 'User not found');

  if (!email || email === user.email) {
    return res.status(200).json(user);
  }

  const emailTaken = await User.findOne({ email });
  if (emailTaken) throw createHttpError(409, 'Email already in use');

  const verifyToken = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60);

  await User.findByIdAndUpdate(req.user._id, {
    pendingEmail: email,
    verifyEmailToken: verifyToken,
    verifyEmailExpires: expires,
  });

  await sendVerificationEmail(email, verifyToken);

  res.status(200).json({
    ...user.toObject(),
    message: 'Check your new email to confirm the change',
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
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    theme: updatedUser.theme,
  });
};
