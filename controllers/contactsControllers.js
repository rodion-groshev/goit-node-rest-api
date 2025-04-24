import fs from "node:fs/promises";
import path from "node:path";
import gravatar from "gravatar";


import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import * as contactsServices from "../services/contactsServices.js";
import { avatarsDir } from "../constants/contacts.js";

const getContactsController = async (req, res) => {
  const { id: owner } = req.user;
  const { favorite } = req.query;
  const filter = { owner };

  if (favorite) {
    filter.favorite = true;
  }

  const contacts = await contactsServices.listContacts(filter);

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const contact = await contactsServices.getContact({ id, owner });

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      contact,
    },
  });
};

const createContact = async (req, res) => {
  let avatarURL;

  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsDir, filename);

    await fs.rename(oldPath, newPath);

    avatarURL = path.join("avatars", filename);
  }
  else {
    const { email } = req.user;
    avatarURL = gravatar.url(email);
  }


  const { id: owner } = req.user;
  const newContact = await contactsServices.addContact({
    ...req.body,
    avatarURL,
    owner,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      newContact,
    },
  });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const deleted_contact = await contactsServices.removeContact({ id, owner });

  if (!deleted_contact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      deleted_contact,
    },
  });
};

const putContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const updatedContact = await contactsServices.updateContact(
    { id, owner },
    req.body
  );

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      updatedContact,
    },
  });
};

const patchContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const updatedStatusContact = await contactsServices.updateStatusContact(
    { id, owner },
    req.body
  );

  if (!updatedStatusContact) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      updatedStatusContact,
    },
  });
};

export default {
  getContactsController: ctrlWrapper(getContactsController),
  getContactByIdController: ctrlWrapper(getContactByIdController),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  putContact: ctrlWrapper(putContact),
  patchContact: ctrlWrapper(patchContact),
};
