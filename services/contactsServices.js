import Contact from "../db/models/Contact.js";

export const listContacts = (query) => {
  return Contact.findAll({ where: query });
};

export const getContact = (query) => Contact.findOne({ where: query });

export const addContact = (data) => {
  return Contact.create(data);
};

export const removeContact = async (query) => {
  const contact = await getContact(query);

  if (contact) {
    await Contact.destroy({ where: query });
    return contact;
  } else return null;
};

export const updateContact = async (query, data) => {
  const contact = await getContact(query);
  if (!contact) return null;

  return contact.update(data, { returning: true });
};

export const updateStatusContact = async (query, data) => {
  const contact = await getContact(query);
  if (!contact) return null;

  return contact.update(data, { returning: true });
};
