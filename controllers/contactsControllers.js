import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} from "../services/contactsServices.js";

const getContactsController = async (req, res) => {
  const { id: owner } = req.user;
  const { favorite } = req.query;
  const filter = { owner };

  if (favorite) {
    filter.favorite = true;
  }

  const contacts = await listContacts(filter);

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

  const contact = await getContact({ id, owner });

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
  const { id: owner } = req.user;
  const newContact = await addContact({ ...req.body, owner });
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

  const deleted_contact = await removeContact({ id, owner });

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
  const updatedContact = await updateContact({ id, owner }, req.body);

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

  const updatedStatusContact = await updateStatusContact(
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
