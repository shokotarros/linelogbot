'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const lineRouter = require('./server/line-router');
const listRouter = require('./server/list-router');

const app = express();
const PORT = process.env.PORT || 1496;

app.use(bodyParser.json());

app.use('/linebot', lineRouter);
app.use('/', listRouter);

app.listen(PORT, () => {
  console.log(`Listening in :${PORT}`);
});
