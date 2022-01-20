//For express
const express = require('express');
const app = express();
const path = require('path');

//For CORS
var cors = require('cors');
app.use(cors());

//For database routing (contains routing and querys for en-fin database)
const admin = require('./routes/admin.js');
const student = require('./routes/student.js');

//Use of frontend (Admin as homepage)
app.use(express.static('frontend/build'));
//app.use(express.static(path.join(__dirname, '../frontend/build')));

//Favicon path (is this really necessary?)
//app.use(favicon(__dirname + '/frontend/build/favicon.ico'));
app.use('/favicon.ico', express.static('frontend/build/favicon.ico'));

//Port definition (Heroku dedicated or default)
const port = process.env.PORT || 8080;

//Use json
app.use(express.json());

//Routing files (one for each view/page)
app.use('/adminop', admin);
app.use('/studentop', student);

//For loading the index.html file (frontend)
//res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function (err)
//path.join(__dirname, './frontend/build/index.html'),
//path.join(__dirname, 'frontend', 'build', 'index.html'),
//Retrieve UI content based on React Router components
//Admin, Student, Error with URL!

app.get('/*', (req, res) => {
  res.sendFile(
    path.join(__dirname + '/frontend/build/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

//Show online status for developer
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
