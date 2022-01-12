//const express = require('express');
//const router = express.Router();

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

//Send all word pairs from database (mainly for debug purposes)
function findAll() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.query('SELECT * FROM en_fin', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
          connection.release();
        }
      });
    });
  });
}

//Save a new word pair into the database
function save(wordpair) {
  return new Promise((resolve, reject) => {
    //Add new body to database
    pool.getConnection((err, connection) => {
      connection.query('INSERT INTO en_fin SET ?', wordpair, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
          connection.release();
        }
      });
    });
  });
}

//Delete word pair from database
function deleteWords(word) {
  return new Promise((resolve, reject) => {
    //console.log(word.english);
    let engWord = word.english;
    //Delete from database
    pool.getConnection((err, connection) => {
      connection.query(
        'DELETE FROM en_fin WHERE english = ' + pool.escape(engWord),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
            connection.release();
          }
        }
      );
    });
  });
}

/*
router.get('/en_fin/all', (req, res) => {
  console.log('Retrieve all words');
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM en_fin', (err, results) => {
      if (err) {
        res.status(500).send('Server error');
      } else {
        res.status(200).send(results);
        connection.release();
      }
    });
  });
});
*/

//module.exports = router;
let connectionFunctions = {
  findAll: findAll,
  save: save,
  deleteWords: deleteWords,
};

module.exports = connectionFunctions;
