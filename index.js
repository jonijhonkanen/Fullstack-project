/*
Basic start template for now,
start modifying it later.

Some key modules in the code.
*/

const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
const mysql = require('mysql');

//For database routing (will contain querys for en-fin database)
const lang_db = require('routes/enfin.js');

//Use of frontend
app.use(express.static('frontend/build'));

/*
let config = {
  host: 'mydb.tamk.fi',
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
};

*/
//Connection credentials
var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

const port = process.env.PORT || 8080;

//This one first
app.use(express.json());
//Then this
app.use('/en_fin', lang_db);

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
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
