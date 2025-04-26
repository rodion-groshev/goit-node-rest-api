import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { generateToken } from "../helpers/jwt.js";
import sendEmail from "../helpers/sendEmail.js";

export const registerUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ where: { email } });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  data.password = hashPassword;

  const verificationToken = nanoid();
  data.verificationToken = verificationToken;

  const newUser = await User.create(data);

  await sendEmail(email, verificationToken);

  return newUser;
};

export const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = generateToken({ email });

  await user.update({ token });

  return { user };
};

export const verifyUser = async (verificationToken) => {
  const user = await findUser({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await user.update({ verify: true, verificationToken: null });
};

export const resendVerifyUser = async (email) => {
  const user = await findUser({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail(email, user.verificationToken);
};

export const logoutUser = async (id) => {
  const user = await findUser({ id });

  await user.update({ token: null });
};

export const updateAvatarUser = async (id, avatarURL) => {
  const user = await findUser({ id });

  await user.update({ avatarURL });

  return user.avatarURL;
};

export const findUser = (query) => User.findOne({ where: query });
