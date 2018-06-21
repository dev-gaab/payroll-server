"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var services = require("../services");
var Usuario_1 = require("../models/Usuario");
var bcrypt = require("bcrypt");
var saltRounds = 12;
var UsuarioCtrl = /** @class */ (function () {
    function UsuarioCtrl() {
    }
    UsuarioCtrl.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new Usuario_1.default;
                        user.username = req.body.username;
                        user.nombre = req.body.nombre;
                        user.apellido = req.body.apellido;
                        user.rol = req.body.rol;
                        user.estatus = 'habilitado';
                        //encryptar la contraseña
                        return [4 /*yield*/, bcrypt.hash(req.body.password, saltRounds)
                                .then(function (hash) {
                                user.password = hash;
                            })
                                .catch(function (err) {
                                res.status(500).send({ message: "Error al hashear la contraseña." });
                            })];
                    case 1:
                        //encryptar la contraseña
                        _a.sent();
                        return [4 /*yield*/, user.create()];
                    case 2:
                        resp = _a.sent();
                        if (!resp) {
                            res.status(500).send(resp);
                        }
                        res.status(200).send(resp);
                        return [2 /*return*/];
                }
            });
        });
    };
    UsuarioCtrl.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, resp, pass, token, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = new Usuario_1.default;
                        user.username = req.body.username;
                        return [4 /*yield*/, user.login()];
                    case 1:
                        resp = _a.sent();
                        if (resp.error) {
                            res.status(500).send(resp.error);
                            return [2 /*return*/];
                        }
                        if (resp == '') {
                            res.status(200).send({ error: "Usuario incorrecto" });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, bcrypt.compare(req.body.password, resp[0].password)];
                    case 2:
                        pass = _a.sent();
                        if (!(pass == true)) return [3 /*break*/, 4];
                        return [4 /*yield*/, services.createToken(resp[0].id)];
                    case 3:
                        token = _a.sent();
                        response = {
                            token: token,
                            user: {
                                nombre: resp[0].nombre,
                                apellido: resp[0].apellido
                            },
                            message: "Login Correcto"
                        };
                        res.status(200).send(response);
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(200).send({ error: "Contraseña incorrecta" });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UsuarioCtrl;
}());
exports.default = UsuarioCtrl;
//# sourceMappingURL=UsuarioCtrl.js.map