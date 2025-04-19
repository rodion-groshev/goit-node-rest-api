import ctrlWrapper from "../decorators/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";

const registerController = async (req, res) => {
  const newUser = await authServices.registerUser(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
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
};
