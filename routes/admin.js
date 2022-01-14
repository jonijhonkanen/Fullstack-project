//Routing for student url
const express = require('express');
const admin = express.Router();

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

//Retrieve all words
admin.get('/all', async (req, res) => {
  //console.log('Retrieve all words');
  try {
    let data = await lang_db.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Add a new word pair
admin.post('/addwords/', async (req, res) => {
  //console.log('Adding words');
  let wordpair = req.body;
  let pairVal = v.validate(wordpair, enfinSchema);
  if (pairVal.errors.length > 0) {
    //'Attribute validation failure'
    res.status(400).send(pairVal.errors);
  } else {
    lang_db
      .save(wordpair)
      .then(() => {
        res.status(201).send();
      })
      .catch((error) => {
        //console.log(error);
        res.status(500).send(error);
      });
  }
});

//Remove a word pair from database
admin.delete('/deletewords/', async (req, res) => {
  //console.log('Deleting word');
  let delWord = req.body;
  let delVal = v.validate(delWord, enfinDelete);
  if (delVal.errors.length > 0) {
    //'Attribute validation failure'
    res.status(400).send(delVal.errors);
  } else {
    //console.log(delWord);
    lang_db
      .deleteWords(delWord)
      .then(() => {
        res.status(204).send();
      })
      .catch((error) => {
        //console.log(error);
        res.status(500).send(error);
      });
  }
});

//Make an update to a word of a word pair
admin.put('/updatewords/', async (req, res) => {
  //console.log('Updating word');
  let wordUpdate = req.body;
  let updateVal = v.validate(wordUpdate, updateSchema);
  if (updateVal.errors.length > 0) {
    //'Attribute validation failure'
    res.status(400).send(updateVal.errors);
  } else {
    //console.log(wordUpdate);
    //let data = await lang_db.save(wordpair);
    //res.status(201).send(data)

    lang_db
      .updateWords(wordUpdate)
      .then(() => {
        res.status(201).send();
      })
      .catch((error) => {
        //console.log(error);
        res.status(500).send(error);
      });
  }
});

module.exports = admin;
