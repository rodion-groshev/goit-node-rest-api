import gravatar from "gravatar";
import fs from "node:fs/promises";
import path from "path";

import HttpError from "../helpers/HttpError.js";
import { avatarsDir } from "../constants/contacts.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";

const registerController = async (req, res) => {
  let avatarURL;

  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsDir, filename);

    await fs.rename(oldPath, newPath);

    avatarURL = path.join("avatars", filename);
  } else {
    const { email } = req.body;
    avatarURL = gravatar.url(email);
  }

  const newUser = await authServices.registerUser({ ...req.body, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const updateAvatarController = async (req, res) => {
  const { id } = req.user;

  if (!req.file) {
    throw HttpError(400, "Missing avatar");
  }

  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsDir, filename);

  await fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", filename);

  const updatedUserAvatar = await authServices.updateAvatarUser(id, avatarURL);

  res.json({
    avatarURL: updatedUserAvatar,
  });
};

const loginController = async (req, res) => {
  const { user } = await authServices.loginUser(req.body);

  res.json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrentController = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logoutController = async (req, res) => {
  const { id } = req.user;

  await authServices.logoutUser(id);

  res.status(204).json({
    message: "No content",
  });
};

export default {
  registerController: ctrlWrapper(registerController),
  loginController: ctrlWrapper(loginController),
  getCurrentController: ctrlWrapper(getCurrentController),
  logoutController: ctrlWrapper(logoutController),
  updateAvatarController: ctrlWrapper(updateAvatarController),
};
