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
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      }
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
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      }
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
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      }
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

//Update word of word pair
//Takes an identifier (word) and the actual change
function updateWords(update) {
  return new Promise((resolve, reject) => {
    //console.log(update);
    let language = update.language;
    let original = update.original;
    let updateTo = update.update;
    let sql = 'UPDATE en_fin SET ?? = ? WHERE ?? = ?';
    //console.log(language);
    //console.log(original);
    //console.log(updateTo);

    //Prepare query (includes escaping query)
    let inserts = [language, updateTo, language, original];
    sql = mysql.format(sql, inserts);

    //Update in database
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
      }
      connection.query(sql, [language, original, updateTo], (err) => {
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

//module.exports = router;
let connectionFunctions = {
  findAll: findAll,
  save: save,
  deleteWords: deleteWords,
  updateWords: updateWords,
};

module.exports = connectionFunctions;
