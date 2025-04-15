import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[0-9\-]+$/)
    .required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9\-]+$/),
  favorite: Joi.boolean(),
})
  .or("name", "email", "phone")
  .messages({
    "object.missing": "Body must have at least one field",
  });

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
