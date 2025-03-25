const fs = require("fs").promises;
const { error } = require("console");
const path = require("path");

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  return contacts?.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  for (const contact of contacts) {
    if (contact.id === contactId) {
      const removedContact = contact;
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );

      await fs.writeFile(
        contactsPath,
        JSON.stringify(updatedContacts, null, 2)
      );

      return removedContact;
    }
  }
  return null;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function updateContact(contactId, updates) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  contacts[index] = { ...contacts[index], ...updates };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
