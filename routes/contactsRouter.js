import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  putContact,
  patchContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), putContact);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(updateStatusContactSchema),
  patchContact
);

export default contactsRouter;
