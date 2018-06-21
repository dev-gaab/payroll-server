"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Express
var express = require("express");
/**
*	Controllers
*/
// usuario
var UsuarioCtrl_1 = require("../controllers/UsuarioCtrl");
// empresa
var EmpresaCtrl_1 = require("../controllers/EmpresaCtrl");
var api = express.Router();
/**
*  ** Instancias **
*/
var usuarioCtrl = new UsuarioCtrl_1.default;
var empresaCtrl = new EmpresaCtrl_1.default;
/**
*	** Rutas **
*/
// usuarios
api.post('/usuarios', usuarioCtrl.register);
api.post('/usuarios/login', usuarioCtrl.login);
// empresas
api.get('/empresas', empresaCtrl.index);
api.get('/empresas/:id', empresaCtrl.find);
module.exports = api;
//# sourceMappingURL=index.js.map