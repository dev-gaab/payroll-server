// Express
import * as express from "express";

/**
*	Controllers
*/

// usuario
import UsuarioCtrl from "../controllers/UsuarioCtrl";

const api = express.Router();

const usuarioCtrl = new UsuarioCtrl;

api.get('/test', usuarioCtrl.login);

module.exports = api;