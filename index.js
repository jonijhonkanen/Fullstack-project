//For express
const express = require('express');
const app = express();

//For CORS
var cors = require('cors');
app.use(cors());

//For sql
const mysql = require('mysql');

//For database routing (contains routing and querys for en-fin database)
const admin = require('./routes/admin.js');
const student = require('./routes/student.js');

//Use of frontend (Admin as homepage)
app.use(express.static('frontend/build'));

//Port definition
const port = process.env.PORT || 8080;

//Use json
app.use(express.json());

//Routing files (one for each view/page)
app.use('/', admin);
app.use('/student', student);

//Show online status for developer
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

//Use try-catch for this
//Retrieve all words

/*
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

*/
