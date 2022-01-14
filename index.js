//For express
const express = require('express');
const app = express();

//For CORS
var cors = require('cors');
app.use(cors());

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
