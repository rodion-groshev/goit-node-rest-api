import express from "express";
import upload from "../middlewares/upload.js";

import validateBody from "../helpers/validateBody.js";
import {
  authRegisterSchemas,
  authLoginSchemas,
  authVerifySchemas,
} from "../schemas/authSchemas.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  upload.single("avatar"),
  validateBody(authRegisterSchemas),
  authControllers.registerController
);

authRouter.post(
  "/login",
  validateBody(authLoginSchemas),
  authControllers.loginController
);

authRouter.post("/logout", authenticate, authControllers.logoutController);

authRouter.post(
  "/verify",
  validateBody(authVerifySchemas),
  authControllers.resendVerifyController
);

authRouter.get("/verify/:verificationToken", authControllers.verifyController);

authRouter.get("/current", authenticate, authControllers.getCurrentController);

authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  authControllers.updateAvatarController
);

export default authRouter;
