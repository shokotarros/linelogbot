'use strict';

const express = require('express');
const router = express.Router();
const https = require('https');
const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;

// const MONGO_URI = 'localhost:27017'
// const MONGO_DBNAME = 'linelog'
const MONGO_URI = 'ishiguro:ishiguro1496@ds030500.mlab.com:30500';
const MONGO_DBNAME = 'linelogbot';

const HOST = 'api.line.me';
const REPLY_PATH = '/v2/bot/message/reply';     // reply用
const PUSH_PATH  = '/v2/bot/message/multicast'; // push用
const CH_SECRET       = 'e078233a479660745f57078747c57429'; // Channel Secret // TODO: set value
const CH_ACCESS_TOKEN = 'vY3SlTD/3myAFW5o8Qzyq9HNOPJKTKyg/n1LtD1RYl2jzl01hYFNJ2txRFPjMsQcrp4FAKOUqURD8O3dZb8LPn+ZJAYIVBLL+Muu4oARaxdUVhRdxJydILjNyqUqDyOJKmestnA9a2Gqh99mMAfXzAdB04t89/1O/w1cDnyilFU='; // Channel Access Token // TODO: set value
const SIGNATURE = crypto.createHmac('sha256', CH_SECRET);
const PORT = process.env.PORT || 3000;

const client = (replyToken, SendMessageObject) => {
    let postDataStr = JSON.stringify({ replyToken: replyToken, messages: SendMessageObject });
    let options = {
        host: HOST,
        port: 443,
        path: REPLY_PATH,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Line-Signature': SIGNATURE,
            'Authorization': `Bearer ${CH_ACCESS_TOKEN}`,
            'Content-Length': Buffer.byteLength(postDataStr)
        }
    };

    return new Promise((resolve, reject) => {
        let req = https.request(options, (res) => {
                    let body = '';
                    res.setEncoding('utf8');
                    res.on('data', (chunk) => {
                        body += chunk;
                    });
                    res.on('end', () => {
                        resolve(body);
                    });
        });

        req.on('error', (e) => {
            reject(e);
        });
        req.write(postDataStr);
        req.end();
    });
};

router.post('/', (req, res, next) => {
  console.log(`accessed ${req.originalUrl}. method: POST`);

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    console.log(body);
    if (body === '') {
      console.log('bodyが空です');
      return;
    }

    let WebhookEventObject = JSON.parse(body).events[0];
    console.log(WebhookEventObject);
    if (WebhookEventObject.type === 'message') {
      SendMessageObject = [{
        type: 'text',
        text: '受け付けに失敗しました。'
      }];

      // TODO: メッセージをパース、コメントとURLに分ける
      let message = WebhookEventObject.message.text;

      let insertObj = [{
        timestamp: WebhookEventObject.timestamp,
        title: '',
        description: '',
        url: ''
      }];

      // DB insert
      MongoClient.connect('mongodb://'+MONGO_URI+'/'+MONGO_DBNAME, function(err, db) {
        if (err) throw err;
        db.collection('cookpad').insertOne(insertObj, function(err, result) {
          if (err) throw err;
          ret = result
          console.log(ret);
        });
      });

      // TODO: メッセージを返す処理
      client(WebhookEventObject.replyToken, SendMessageObject)
      .then((body)=>{
          console.log(body);
      },(e)=>{console.log(e)});
    }

    res.send('su');
  });
});


module.exports = router;
