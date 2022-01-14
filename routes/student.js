//Routing for student url
const express = require('express');
const student = express.Router();

//Import functions for querys
const lang_db = require('./enfin.js');

//For request validation
const Validator = require('jsonschema').Validator;
const v = new Validator();

//For validation
const enfinSchema = {
  type: 'object',
  required: ['english', 'finnish'],
  minProperties: 2,
  maxProperties: 3,
  properties: {
    english: {
      type: 'string',
    },
    finnish: {
      type: 'string',
    },
    tag: {
      type: 'string',
    },
  },
};

//For delete validation
const enfinDelete = {
  type: 'object',
  required: ['english'],
  maxProperties: 1,
  properties: {
    english: {
      type: 'string',
    },
  },
};

//For update validation
const updateSchema = {
  type: 'object',
  maxProperties: 3,
  properties: {
    language: {
      type: 'string',
    },
    original: {
      type: 'string',
    },
    update: {
      type: 'string',
    },
  },
};

//Get all words from the database
student.get('/all', async (req, res) => {
  //console.log('Retrieve all words');
  try {
    let data = await lang_db.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = student;
