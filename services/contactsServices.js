import Contact from "../db/models/Contact.js";

export const listContacts = () => {
  return Contact.findAll();
};

export const getContactById = (contactId) => {
  return Contact.findByPk(contactId);
};

export const addContact = (data) => {
  return Contact.create(data);
};

export const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);

  if (contact) {
    await Contact.destroy({ where: { id: contactId } });
    return contact;
  } else return null;
};

export const updateContact = async (contactId, data) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  return contact.update(data, { returning: true });
};

export const updateStatusContact = async (contactId, data) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  return contact.update(data, { returning: true });
};
