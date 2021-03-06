var db;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/linebot-list';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, mongodb) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  db = mongodb;
});

var collection = function( name ) {
  return db.collection( name );
}

module.exports = collection;
