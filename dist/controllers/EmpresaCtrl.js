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
var Empresa_1 = require("../models/Empresa");
var EmpresaCtrl = /** @class */ (function () {
    function EmpresaCtrl() {
        // code...
    }
    // obtener todas las empresas
    EmpresaCtrl.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var empresa, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        empresa = new Empresa_1.default;
                        return [4 /*yield*/, empresa.index()];
                    case 1:
                        data = _a.sent();
                        if (data.error) {
                            return [2 /*return*/, res.status(500).send(data.error)];
                        }
                        return [2 /*return*/, res.status(200).send(data)];
                }
            });
        });
    };
    // obtener una sola empresa..
    EmpresaCtrl.prototype.find = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var empresa, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        empresa = new Empresa_1.default;
                        empresa.id = req.params.id;
                        return [4 /*yield*/, empresa.index()];
                    case 1:
                        data = _a.sent();
                        if (data.error) {
                            return [2 /*return*/, res.status(500).send(data.error)];
                        }
                        if (data.data == '') {
                            return [2 /*return*/, res.status(200).send({ message: "Empresa no existe" })];
                        }
                        return [2 /*return*/, res.status(200).send(data)];
                }
            });
        });
    };
    // crear una empresa nueva
    EmpresaCtrl.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var empresa, val, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        empresa = new Empresa_1.default;
                        // parametros
                        empresa.rif = req.body.rif;
                        empresa.razon_social = req.body.razon_social;
                        empresa.direccion = req.body.direccion;
                        empresa.num_afiliacion_ivss = req.body.num_ivss;
                        empresa.num_afiliacion_faov = req.body.num_faov;
                        empresa.num_afiliacion_inces = req.body.num_inces;
                        empresa.fecha_afiliacion_ivss = req.body.fecha_ivss;
                        empresa.estatus = 'habilitada';
                        return [4 /*yield*/, empresa.validateInsert()];
                    case 1:
                        val = _a.sent();
                        if (val.success == false) {
                            return [2 /*return*/, res.send({ error: "El rif de la empresa ya existe" })];
                        }
                        return [4 /*yield*/, empresa.create()];
                    case 2:
                        resp = _a.sent();
                        if (resp.error) {
                            return [2 /*return*/, res.status(500).send(resp.error)];
                        }
                        return [2 /*return*/, res.status(200).send(resp)];
                }
            });
        });
    };
    // editar una empresas
    EmpresaCtrl.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var empresa, val, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        empresa = new Empresa_1.default;
                        // parametros
                        empresa.id = req.params.id;
                        empresa.rif = req.body.rif;
                        empresa.razon_social = req.body.razon_social;
                        empresa.direccion = req.body.direccion;
                        empresa.num_afiliacion_ivss = req.body.num_ivss;
                        empresa.num_afiliacion_faov = req.body.num_faov;
                        empresa.num_afiliacion_inces = req.body.num_inces;
                        empresa.fecha_afiliacion_ivss = req.body.fecha_ivss;
                        return [4 /*yield*/, empresa.validateUpdate()];
                    case 1:
                        val = _a.sent();
                        if (val.success == false) {
                            return [2 /*return*/, res.send({ error: "El rif de la empresa ya existe" })];
                        }
                        return [4 /*yield*/, empresa.update()];
                    case 2:
                        resp = _a.sent();
                        if (resp.error) {
                            return [2 /*return*/, res.status(500).send(resp.error)];
                        }
                        return [2 /*return*/, res.status(200).send(resp)];
                }
            });
        });
    };
    // eliminar una empresa
    EmpresaCtrl.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var empresa, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        empresa = new Empresa_1.default;
                        // parametros
                        empresa.id = req.params.id;
                        return [4 /*yield*/, empresa.delete()];
                    case 1:
                        resp = _a.sent();
                        if (resp.error) {
                            return [2 /*return*/, res.status(500).send(resp.error)];
                        }
                        return [2 /*return*/, res.status(200).send(resp)];
                }
            });
        });
    };
    // habilitar una empresa
    EmpresaCtrl.prototype.enable = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var empresa, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        empresa = new Empresa_1.default;
                        // parametros
                        empresa.id = req.params.id;
                        return [4 /*yield*/, empresa.enable()];
                    case 1:
                        resp = _a.sent();
                        if (resp.error) {
                            return [2 /*return*/, res.status(500).send(resp.error)];
                        }
                        return [2 /*return*/, res.status(200).send(resp)];
                }
            });
        });
    };
    // inhabilitar una empresa
    EmpresaCtrl.prototype.disable = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var empresa, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        empresa = new Empresa_1.default;
                        // parametros
                        empresa.id = req.params.id;
                        return [4 /*yield*/, empresa.disable()];
                    case 1:
                        resp = _a.sent();
                        if (resp.error) {
                            return [2 /*return*/, res.status(500).send(resp.error)];
                        }
                        return [2 /*return*/, res.status(200).send(resp)];
                }
            });
        });
    };
    return EmpresaCtrl;
}());
exports.default = EmpresaCtrl;
//# sourceMappingURL=EmpresaCtrl.js.map