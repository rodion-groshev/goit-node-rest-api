import HttpError from "../helpers/HttpError.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../services/contactsServices.cjs";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);

    contact
      ? res.json({
          status: "success",
          code: 200,
          data: {
            contact,
          },
        })
      : next(HttpError(404, "Not found"));
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted_contact = await removeContact(id);

    contact
      ? res.json({
          status: "success",
          code: 200,
          data: {
            deleted_contact,
          },
        })
      : next(HttpError(404, "Not found"));
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await addContact(req.body);
    res.json({
      status: "success",
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const putContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await updateContact(id, req.body);
    updatedContact
      ? res.json({
          status: "success",
          code: 200,
          data: {
            updatedContact,
          },
        })
      : next(HttpError(404, "Not found"));
  } catch (error) {
    next(error);
  }
};
