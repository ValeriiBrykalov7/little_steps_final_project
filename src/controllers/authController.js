import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { createSession, setSessionCookies } from '../services/auth.js';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';
import { isValidObjectId } from 'mongoose';
import { OAuth2Client } from 'google-auth-library';

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  const newSession = await createSession(newUser._id);
  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { sessionId } = req.cookies;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  const newSession = await createSession(user._id);

  setSessionCookies(res, newSession);
  res.status(200).json(user);
};

export const logout = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId && isValidObjectId(sessionId)) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshSession = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  console.log(req.cookies);

  if (!sessionId || !refreshToken) {
    throw createHttpError(401, 'Missing session credentials');
  }

  if (!isValidObjectId(sessionId)) {
    throw createHttpError(401, 'Invalid session id');
  }

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await Session.deleteOne({
    _id: sessionId,
  });

  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({
    message: 'Session refreshed',
  });
};

// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const { credential } = req.body;
  console.log('GOOGLE CREDENTIAL:', credential);

   if (!credential) {
    throw createHttpError(400, 'Google credential is required');
  }
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  console.log('GOOGLE TICKET:', ticket);

  const payload = ticket.getPayload();

  if (!payload?.email || !payload?.sub) {
    throw createHttpError(401, 'Invalid Google token');
  }

  const { email, name, picture, sub } = payload;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      username: name || email.split('@')[0],
      email,
      avatar: picture,
      googleId: sub,
      provider: 'google',
    });
  } else {
    user.googleId = user.googleId || sub;
    user.provider = user.provider || 'google';

    if (picture && !user.avatar) {
      user.avatar = picture;
    }

    await user.save();
  }

  const { sessionId } = req.cookies;

  if (sessionId && isValidObjectId(sessionId)) {
    await Session.deleteOne({ _id: sessionId });
  }

  const newSession = await createSession(user._id);

  setSessionCookies(res, newSession);

  res.status(200).json(user);


};
