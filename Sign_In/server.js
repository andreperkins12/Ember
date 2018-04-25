const express = require('express');
const opn = require('opn');
const _ = require('lodash');
const bodyParser = require('body-parser');

const mysql = require('mysql2');
// create the connection to the database
const connection = mysql.createConnection({
  host: 'xaviablaza.com',
  user: 'ember_user',
  password: 'ember_pwd',
  database: 'ember',
});

const app = express();
const port = 5000;

function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next()
}

app.use(allowCrossDomain);
app.use('/', express.static(__dirname + '/public'));
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`);
  opn('http://localhost:5000')
});

app.use(bodyParser.json());

/*
Add Contact Information
name, gender, birthday, hometown, title, blockstackID
 */
app.post('/userinfo', (req, res) => {
  connection.query(
    'INSERT INTO `UserContacts` (Name,Gender,Birthday,Hometown,Title) VALUES(?,?,?,?,?);',
    ['Xavi','M','2018-04-12 00:00:00','Manila','Software Engineer'],
    function(err, results) {
      console.log(results);
    }
  );
});

/*
Add User Email
blockstackID, email
 */
app.post('/email', (req, res) => {

  connection.query(
    'INSERT INTO UserEmail'
  );

  connection.query(
    'INSERT INTO UserEmail ('
  );
});

/*
Add Login Time
blockstackID, time
 */
app.post('/logintime', (req,res) => {

});

/*
Add Follower
user: blockstackID,
follower: blockstackID
 */
app.post('/follower', (req,res) => {

});

/*
Add User Post
user: blockstackID,
uri: resourceURI
 */
app.post('/userpost', (req,res) => {

});

app.get('/posts', (req,res) => {

});
