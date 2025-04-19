import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  authRegisterSchemas,
  authLoginSchemas,
} from "../schemas/authSchemas.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchemas),
  authControllers.registerController
);

authRouter.post(
  "/login",
  validateBody(authLoginSchemas),
  authControllers.loginController
);

authRouter.post("/logout", authenticate, authControllers.logoutController);

authRouter.get("/current", authenticate, authControllers.getCurrentController);

export default authRouter;
