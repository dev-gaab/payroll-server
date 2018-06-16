import * as express from "express";
// const express = require('express');
const db = require('../db');

const api = express.Router();

api.get('/test', async (req, res) => {

    const { rows } = await db.query('SELECT * FROM usuario');
    console.log(rows);
    res.send(rows);
    
});

module.exports = api;