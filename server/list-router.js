'use strict';

const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

// const MONGO_URI = 'localhost:27017'
// const MONGO_DBNAME = 'linelog'
const MONGO_URI = 'nodegirls:n0deg@!r1s@ds030500.mlab.com:30500';
const MONGO_DBNAME = 'linelogbot';

router.get('/', (req, res, next) => {
  console.log(`accessed ${req.originalUrl}`);
  console.log(`connect mongo`);
  var ret;

  MongoClient.connect('mongodb://'+MONGO_URI+'/'+MONGO_DBNAME, function(err, db) {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'Something failed!' });
    }

    db.collection('cookpad').find().toArray(function(err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: 'Something failed!' });
      }
      ret = result
      console.log(ret);
    });
  });

  // TODO: 接続確認用。あとで書き換え
  return res.send('データ取れたよ！\n');
});

module.exports = router;
