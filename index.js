//For express
const express = require('express');
const app = express();

//For CORS
var cors = require('cors');
app.use(cors());

//For sql
const mysql = require('mysql');

//For request validation
const Validator = require('jsonschema').Validator;
const v = new Validator();

//For database routing (will contain querys for en-fin database)
const lang_db = require('./routes/enfin.js');

//Use of frontend
app.use(express.static('frontend/build'));

//Port definition
const port = process.env.PORT || 8080;

//This one first
app.use(express.json());
//Then this
//app.use('/en_fin', lang_db);

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

//Use try-catch for this
//Retrieve all words
app.get('/all', async (req, res) => {
  console.log('Retrieve all words');
  let data = await lang_db.findAll();
  res.status(200).send(data);
});

//Add a new word pair
app.post('/addwords/', async (req, res) => {
  console.log('Adding words');
  let wordpair = req.body;
  let pairVal = v.validate(wordpair, enfinSchema);
  if (pairVal.errors.length > 0) {
    //'Attribute validation failure'
    res.status(400).send(pairVal.errors);
  } else {
    //console.log(wordpair);
    //let data = await lang_db.save(wordpair);
    //res.status(201).send(data)
    lang_db
      .save(wordpair)
      .then(() => {
        res.status(201).send();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

//Remove a word pair from database
app.delete('/deletewords/', async (req, res) => {
  console.log('Deleting word');
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
        console.log(error);
      });
  }
});

//Make an update to a word of a word pair
app.put('/updatewords/', async (req, res) => {
  console.log('Updating word');
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
        console.log(error);
      });
  }
});

//Show online status for developer
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

/*
let config = {
  host: 'mydb.tamk.fi',
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
};

*/

/*
const db = [{ name: 'tiina' }, { name: 'jack' }];

app.get('/names', (req, res) => {
  res.send(db);
});
*/

//Connection pool
/*
var pool = mysql.createPool(config);
app.get('/', (req, res) => {
  pool.query('SELECT * from locations', (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.send(results);
    }
  });
});
*/

//Connection credentials
/*
var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});
*/
