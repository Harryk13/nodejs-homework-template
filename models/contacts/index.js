const fs = require('fs/promises');
const Joi = require('joi');
const Contact = require('./model');

const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const listContacts = async () => {
  const result = await Contact.find({});

  return result;
}

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);

  return result;
}

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    return false;
  }
}

const addContact = async (body) => {
  const {error} = createSchema.validate(body);

  if (error) {
    return null;
  } else {
    const result = await Contact.create(body);

    return result;
  }
}

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, body, {new: true});

  if (!result) {
    return {error: {message: 'Not found', code: 404}};
  }

  return {contact: result};
}

const updateStatusContact = async (contactId, state) => {
  const result = await Contact.findByIdAndUpdate(contactId,{favorite: state},{new: true});

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
