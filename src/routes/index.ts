// Express
import * as express from "express";
// middlewares
import * as auth from "../middlewares/auth";
/**
*	Controllers
*/

// usuario
import UsuarioCtrl from "../controllers/UsuarioCtrl";
// empresa
import EmpresaCtrl from "../controllers/EmpresaCtrl";

const api = express.Router();

/** 
*  ** Instancias **
*/
const usuarioCtrl = new UsuarioCtrl;
const empresaCtrl = new EmpresaCtrl;
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