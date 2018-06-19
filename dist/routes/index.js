"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Express
var express = require("express");
/**
*	Controllers
*/
// usuario
var UsuarioCtrl_1 = require("../controllers/UsuarioCtrl");
var api = express.Router();
var usuarioCtrl = new UsuarioCtrl_1.default;
api.get('/test', usuarioCtrl.login);
module.exports = api;
//# sourceMappingURL=index.js.map