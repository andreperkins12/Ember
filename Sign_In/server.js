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
blockstack_id, name, gender, birthday, hometown, title
 */
app.post('/api/v1/usercontact', (req, res) => {
  connection.query(
    'INSERT INTO UserContacts (Name,Gender,Birthday,Hometown,Title) VALUES(?,?,?,?,?)',
    [req.body.name,req.body.gender,req.body.birthday,req.body.hometown,req.body.title],
    (err, results) => {
      if (err) res.status(400).send(err);
      var cid = results.insertId;
      connection.query(
        'INSERT INTO UserBlockstackIDs (BlockstackID,cid) VALUES (?,?)',
        [req.body.blockstack_id,cid],
        (err, results) => {
          if (err) res.status(400).send(err);
          res.status(200).send(results);
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
    'SELECT cid FROM UserBlockstackIDs WHERE BlockstackID=?',
    [req.body.blockstack_id],
    (err, results) => {
      if (err || !results) return res.status(400).send();
      let cid = results[0].cid;
      connection.query(
        'INSERT INTO UserEmails (cid,Email) VALUES (?,?)',
        [cid,req.body.email],
        (err, results) => {
          if (err) res.status(400).send(err);
          console.log(results);
          res.status(200).send();
        }
      );
    });
});

/*
Add Login Time
blockstackID, time
 */
app.post('/api/v1/logintime', (req,res) => {
  connection.query(
    'SELECT cid FROM UserBlockstackIDs WHERE BlockstackID=?',
    [req.body.blockstack_id],
    (err, results) => {
      if (err || !results) return res.status(400).send();
      let cid = results[0].cid;
      connection.query(
        'INSERT INTO UserLoginTimes (cid,Login) VALUES (?,?)',
        [cid,req.body.login_time],
        (err, results) => {
          if (err) res.status(400).send(err);
          console.log(results);
          res.status(200).send();
        }
      );
  });
});

/*
Add Follower
user: blockstackID,
follower: blockstackID
 */
app.post('/api/v1/follower', (req,res) => {
  connection.query(
    'SELECT cid FROM UserBlockstackIDs WHERE BlockstackID=?',
    [req.body.blockstack_id],
    (err, results) => {
      if (err || !results) return res.status(400).send();
      let cid = results[0].cid;
      connection.query(
        'SELECT cid FROM UserBlockstackIDs WHERE BlockstackID=?',
        [req.body.follower_id],
        (err, results) => {
          if (err || !results) return res.status(400).send();
          let ProfileID = results[0].cid;
          connection.query(
            'INSERT INTO UserFollowers (cid,ProfileID) VALUES (?,?)',
            [cid,ProfileID],
            (err, results) => {
              if (err) res.status(400).send(err);
              console.log(results);
              res.status(200).send();
            });
        });
    });
});

/*
Add Post with Text
user: blockstackID,
content: content
 */
app.post('/api/v1/textpost', (req,res) => {
  console.log(req.body.blockstack_id);
  connection.query(
    'SELECT cid FROM UserBlockstackIDs WHERE BlockstackID=?',
    [req.body.blockstack_id],
    (err, results) => {
      console.log(results);
      if (err || !results) return res.status(400).send();
      let cid = results[0].cid;
      connection.query(
        'INSERT INTO UserPosts (cid,Content) VALUES (?,?)',
        [cid,req.body.content],
        (err, results) => {
          if (err) res.status(400).send(err);
          console.log(results);
          res.status(200).send();
        }
      );
    });
});

/*
Add Post with Image and Text
 */
app.post('/api/v1/imagepost', (req,res) => {
  connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query(
      'SELECT cid FROM UserBlockstackIDs WHERE BlockstackID=?',
      [req.body.blockstack_id],
      (err, results) => {
        if (err || !results) return res.status(400).send();
        let cid = results[0].cid;
        connection.query('INSERT INTO UserPosts (cid,Content) VALUES (?,?)', [cid,req.body.content], function (error, results, fields) {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          }
          var postID = results.insertId;
          connection.query('INSERT INTO UserImages (ResourceURI,pid,cid) VALUES (?,?,?)', [req.body.image_uri,postID,cid], function (error, results, fields) {
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
});

app.get('/api/v1/posts', (req,res) => {
  connection.query(
    'SELECT cid FROM UserBlockstackIDs WHERE BlockstackID=?',
    [req.query.blockstack_id],
    (err, results) => {
      if (err) return res.status(400).send(err);
      let cid = results[0].cid;
      connection.query(
        'SELECT Content,ResourceURI,Name ' +
        'FROM (UserPosts up LEFT JOIN UserImages ui ON up.id = ui.pid) ' +
        'JOIN UserContacts uc ON up.cid=uc.cid ' +
        'WHERE up.cid=?',
        [cid],
        (err, results) => {
          if (err) return res.status(400).send(err);
          console.log(JSON.stringify(results));
          res.status(200).send(JSON.stringify(results));
        }
      );
    });
});

app.get('/api/v1/allposts', (req,res) => {
  connection.query(
    'SELECT Content,ResourceURI,Name ' +
    'FROM (UserPosts up LEFT JOIN UserImages ui ON up.id = ui.pid) ' +
    'JOIN UserContacts uc ON up.cid=uc.cid',
    (err, results) => {
      if (err) return res.status(400).send(err);
      res.status(200).send({"posts":results});
    }
  );
});


app.get('/api/v1/feed', (req,res) => {
  connection.query(
    'SELECT cid FROM UserBlockstackIDs WHERE BlockstackID=?',
    [req.query.blockstack_id],
    (err, results) => {
      if (err) return res.status(400).send(err);
      let cid = results[0].cid;
      connection.query(
        'SELECT uc.Name,up.Content,ui.ResourceURI FROM ' +
        'UserFollowers uf JOIN ((UserPosts up LEFT JOIN UserImages ui ON up.id = ui.pid) ' +
        'JOIN UserContacts uc ON up.cid=uc.cid) ON uf.ProfileID=up.cid',
        [cid],
        (err, results) => {
          if (err) return res.status(400).send(err);
          res.status(200).send({"posts":results});
        }
      );
    });
});
