"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require('../db');
var Empresa = /** @class */ (function () {
    function Empresa() {
    }
    Empresa.prototype.index = function () {
        var sql = "SELECT * FROM empresa";
        var resp = db.query(sql)
            .then(function (res) {
            return { data: res.rows };
        })
            .catch(function (err) {
            return { error: err.stack };
        });
        return resp;
    };
    Empresa.prototype.find = function () {
        var sql = {
            text: 'SELECT * FROM empresa WHERE id=$1',
            values: [this.id]
        };
        var resp = db.query(sql)
            .then(function (res) {
            return { data: res.rows };
        })
            .catch(function (err) {
            return { error: err.stack };
        });
        return resp;
    };
    Empresa.prototype.create = function () {
        var sql = {
            text: 'INSERT INTO empresa(id, rif, razon_social, direccion, riesgo_ivss, num_afiliacion_ivss, num_afiliacion_inces, num_afiliacion_faov, fecha_inscripcion_ivss, estatus) VALUES (default, $1, $2, $3, $4, $5, $6) ',
            values: [this.rif, this.razon_social, this.direccion, this.riesgo_ivss, this.num_afiliacion_ivss, this.num_afiliacion_inces, this.num_afiliacion_faov, this.fecha_afiliacion_ivss, this.estatus]
        };
        var resp = db.query(sql)
            .then(function (res) {
            return { message: "Inserción exitosa" };
        })
            .catch(function (err) {
            return { error: err.stack };
        });
        return resp;
    };
    Empresa.prototype.update = function () {
        var sql = {
            text: 'UPDATE empresa SET rif = $2, razon_social = $3, direccion = $4, riesgo_ivss = $5, num_afiliacion_ivss = $6, num_afiliacion_inces = $7, num_afiliacion_faov = $8, fecha_afiliacion_ivss = $9 WHERE id=$1',
            values: [this.id, this.rif, this.razon_social, this.direccion, this.riesgo_ivss, this.num_afiliacion_ivss, this.num_afiliacion_inces, this.num_afiliacion_faov, this.fecha_afiliacion_ivss]
        };
        var resp = db.query(sql)
            .then(function (res) {
            return { message: "Actualización exitosa" };
        })
            .catch(function (err) {
            return { error: err.stack };
        });
        return resp;
    };
    Empresa.prototype.delete = function () {
        var sql = {
            text: 'SELECT FROM empresa WHERE id=$1',
            values: [this.id]
        };
        var resp = db.query(sql)
            .then(function (res) {
            return { message: "Eliminación exitosa" };
        })
            .catch(function (err) {
            return { error: err.stack };
        });
        return resp;
    };
    Empresa.prototype.enable = function () {
        var sql = {
            text: 'UPDATE empresa SET estatus=$2 WHERE id=$1',
            values: [this.id, 'habilitada']
        };
        var resp = db.query(sql)
            .then(function (res) {
            return { message: "Empresa habilitada" };
        })
            .catch(function (err) {
            return { error: err.stack };
        });
        return resp;
    };
    Empresa.prototype.disable = function () {
        var sql = {
            text: 'UPDATE empresa SET estatus=$2 WHERE id=$1',
            values: [this.id, 'inhabilitada']
        };
        var resp = db.query(sql)
            .then(function (res) {
            return { message: "Empresa inhabilitada" };
        })
            .catch(function (err) {
            return { error: err.stack };
        });
        return resp;
    };
    Empresa.prototype.validateInsert = function () {
        var sql = {
            text: 'SELECT * FROM empresa WHERE rif=$1',
            values: [this.rif]
        };
        var resp = db.query(sql)
            .then(function (res) {
            if (res.rows == '') {
                return { success: true };
            }
            else {
                return { success: false };
            }
        })
            .catch(function (err) {
            return { error: err.stack };
        });
        return resp;
    };
    Empresa.prototype.validateUpdate = function () {
        var sql = {
            text: 'SELECT * FROM empresa WHERE rif=$1 AND id<>$2',
            values: [this.rif, this.id]
        };
        var resp = db.query(sql)
            .then(function (res) {
            if (res.rows == '') {
                return { success: true };
            }
            else {
                return { success: false };
            }
        })
            .catch(function (err) {
            return { error: err.stack };
        });
        return resp;
    };
    return Empresa;
}());
exports.default = Empresa;
//# sourceMappingURL=Empresa.js.map