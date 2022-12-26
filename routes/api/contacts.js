const express = require('express')
const router = express.Router()
const contactsModel = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const contacts = await contactsModel.listContacts();

  res.json(contacts || []);
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await contactsModel.getContactById(req.params.contactId);

  if (contact) {
    res.json(contact);
  } else {
    res
        .status(404)
        .json({
          message: 'Not found'
        });
  }
})

router.post('/', async (req, res, next) => {
  const contact = await contactsModel.addContact(req.body);

  if (contact) {
    res.status(201).json(contact);
  } else {
    res
        .status(400)
        .json({
          message: 'missing required name field'
        });
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const result = await contactsModel.getContactById(req.params.contactId);

  if (result) {
    res.json({
      message: 'contact deleted'
    });
  } else {
    res
        .status(404)
        .json({
          message: 'Not found'
        });
  }
})

router.put('/:contactId', async (req, res, next) => {
  const {contact, error} = await contactsModel.addContact(req.body);

  if (contact && !error) {
    res.json(contact);
  } else {
    res
        .status(error.code)
        .json({
          message: error.message
        });
  }
})


module.exports = router
