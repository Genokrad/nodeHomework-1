const fs = require("node:fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const some = JSON.parse(contacts).find((contact) => {
      if (String(contact.id) === String(contactId)) {
        return contact;
      }
    });
    console.log(some);
    return some;
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const filteredContacts = JSON.parse(contacts).filter(
      (contact) => contact.id !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    console.table(filteredContacts);
  } catch (error) {
    console.log(error);
  }
};

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const updatedContacts = [...contacts, { id: uuidv4(), name, email, phone }];
    console.table(updatedContacts);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
