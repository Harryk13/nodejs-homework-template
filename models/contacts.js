const fs = require('fs/promises');
const Joi = require('joi');
const contacts = require('./contacts.json');

const path = require("path");
const contactsPath = path.join(__dirname, 'contacts.json');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const save = async () => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const listContacts = async () => {
  return contacts;
}

const getContactById = async (contactId) => {
  return contacts.find(item => item.id === contactId);
}

const removeContact = async (contactId) => {
  const index = contacts.findIndex(item => item.id === contactId);

  if (index >= 0) {
    contacts.slice(index);
    await save();

    return true;
  } else {
    return false;
  }
}

const addContact = async (body) => {
  const {error} = schema.validate(body);

  if (error) {
    return null;
  } else {
    const lastId = contacts[contacts.length - 1].id || 0;

    body.id = lastId + 1;
    contacts.push(body);
    await save();

    return body;
  }
}

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex(item => item.id === contactId);

  if (index >= 0) {
    const updatedData = {...contacts[index], body};
    const {error} = schema.validate(updatedData);

    if (error) {
      return {error: {message: 'missing fields', code: 400}}
    }

    contacts[index] = updatedData;
    await save();

    return {contact: body};
  } else {
    return {error: {message: 'Not found', code: 404}};
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
