"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
var express = require("express");
// const bodyParser = require('body-parser');
var bodyParser = require("body-parser");
var app = express();
var api = require('./routes');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);
module.exports = app;
//# sourceMappingURL=app.js.map