import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/jwt.js";

export const registerUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ where: { email } });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  data.password = hashPassword;
  return User.create(data);
};

export const loginUser = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = generateToken({ email });

  await user.update({ token });

  return { user };
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
