import Joi from "joi";
import { emailRegex } from "../constants/auth.js";

export const authRegisterSchemas = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

export const authLoginSchemas = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

export const authVerifySchemas = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});
