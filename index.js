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

let config = {
  host: 'mydb.tamk.fi',
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  connectionLimit: 10,
};

const port = process.env.PORT || 8080;

/*
const db = [{ name: 'tiina' }, { name: 'jack' }];

app.get('/names', (req, res) => {
  res.send(db);
});
*/

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

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
