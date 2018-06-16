// const express = require('express');
import * as express from "express";
// const bodyParser = require('body-parser');
import * as bodyParser from "body-parser";

const app = express();
const api = require('./routes');

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

app.use('/api', api);

module.exports = app;