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
New Blockstack ID? Then call this
Use the blockstack ID
 */
app.post('/api/v1/newuser', (req, res) => {
  connection.query(
    'INSERT INTO UserBlockstackID (BlockstackID) VALUES (?)',
    [req.body.blockstack_id],
    (err, results) => {
      if (err) res.status(400).send(err);
      console.log(results);
      res.status(200).send();
    }
  );
});

// connection.beginTransaction(function(err) {
//   if (err) { throw err; }
//   connection.query('INSERT INTO UserPosts SET ResourceURI=?', req.body.post_uri, function (error, results, fields) {
//     if (error) {
//       return connection.rollback(function() {
//         throw error;
//       });
//     }
//     var postID = results.insertId;
//     connection.query('INSERT INTO UserImages (ResourceURI,PostID) VALUES (?,?)', [req.body.image_uri,postID], function (error, results, fields) {
//       if (error) {
//         return connection.rollback(function() {
//           throw error;
//         });
//       }
//       connection.commit(function(err) {
//         if (err) {
//           return connection.rollback(function() {
//             throw err;
//           });
//         }
//         console.log('success!');
//         res.status(200).send();
//       });
//     });
//   });
// });

app.get('/api/v1/bid',(req,res) => {
  let id = req.query['blockstack_id'];
  connection.query(
    'SELECT cid FROM UserBlockstackID WHERE BlockstackID=?',
    [id],
    (err, results) => {
      console.log(results);
      res.status(200).send();
    });
});


/*
Add Contact Information
blockstack_id, name, gender, birthday, hometown, title
 */
app.post('/api/v1/usercontact', (req, res) => {
  connection.query(
    'SELECT cid FROM UserBlockstackID WHERE BlockstackID=?',
    [req.body.blockstack_id],
    (err, results) => {
      var cid = results.cid;
      connection.query(
        'INSERT INTO UserContacts (Name,Gender,Birthday,Hometown,Title) VALUES(?,?,?,?,?)',
        [req.body.name,req.body.gender,req.body.birthday,req.body.hometown,req.body.title],
        (err, results) => {
          if (err) res.status(400).send(err);
          console.log(results);
          res.status(200).send();
        }
      );
    }
  );
});

/*
Add User Email
blockstackID, email
 */
app.post('/api/v1/useremail', (req, res) => {
  connection.query(
    'INSERT INTO UserEmail (Email) VALUES (?)',
    [req.body.email],
    (err, results) => {
      if (err) res.status(400).send(err);
      console.log(results);
      res.status(200).send();
    }
  );
});

/*
Add Login Time
blockstackID, time
 */
app.post('/api/v1/logintime', (req,res) => {
  connection.query(
    'INSERT INTO UserLoginTimes (Login) VALUES (?)',
    [req.body.login_time],
    (err, results) => {
      if (err) res.status(400).send(err);
      console.log(results);
      res.status(200).send();
    }
  );
});

/*
Add Follower
user: blockstackID,
follower: blockstackID
 */
app.post('/follower', (req,res) => {

});

/*
Add Post with Text
user: blockstackID,
uri: resourceURI
 */
app.post('/textpost', (req,res) => {
  connection.query(
    'INSERT INTO UserPosts (ResourceURI) VALUES (?)',
    [req.body.resource_uri],
    (err, results) => {
      if (err) res.status(400).send(err);
      console.log(results);
      res.status(200).send();
    }
  );
});

/*
Add Post with Image and Text
 */
app.post('/imagepost', (req,res) => {
  connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query('INSERT INTO UserPosts SET ResourceURI=?', req.body.post_uri, function (error, results, fields) {
      if (error) {
        return connection.rollback(function() {
          throw error;
        });
      }
      var postID = results.insertId;
      connection.query('INSERT INTO UserImages (ResourceURI,PostID) VALUES (?,?)', [req.body.image_uri,postID], function (error, results, fields) {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        }
        connection.commit(function(err) {
          if (err) {
            return connection.rollback(function() {
              throw err;
            });
          }
          console.log('success!');
          res.status(200).send();
        });
      });
    });
  });
});

app.post('/follower', (req,res) => {
  connection.query(
    'INSERT INTO UserFollowers (ProfileID) VALUES (?)',
    [req.body.follower_id],
    (err, results) => {
      if (err) res.status(400).send(err);
      console.log(results);
      res.status(200).send();
    }
  );
});

