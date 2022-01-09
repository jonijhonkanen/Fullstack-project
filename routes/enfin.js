const express = require('express');
const router = express.Router();
const Validator = require('jsonschema').Validator;
const v = new Validator();

//Mysql
const mysql = require('mysql');

//Credentials
require('dotenv').config();

//Connection credentials
var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

const enfinSchema = {
  type: 'object',
  required: ['english', 'finnish'],
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

router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM en_fin', (err, enfinWords) => {
      if (err) {
        res.status(500).send('Server error');
      } else {
        res.status(200).send(enfinWords);
        connection.release();
      }
    });
  });
});

module.exports = router;
