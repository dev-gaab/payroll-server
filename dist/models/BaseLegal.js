"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require('../db');
var BaseLegal = /** @class */ (function () {
    function BaseLegal() {
    }
    BaseLegal.prototype.index = function () {
        var sql = {
            text: "SELECT * FROM base_calculo",
            values: []
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
    BaseLegal.prototype.find = function () {
        var sql = {
            text: 'SELECT bc.id, bc.desde FROM empresa WHERE id=$1',
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
    BaseLegal.prototype.create = function () {
    };
    BaseLegal.prototype.update = function () {
    };
    BaseLegal.prototype.updateAsignaciones = function () {
    };
    BaseLegal.prototype.updateDeducciones = function () {
    };
    BaseLegal.prototype.updateCestaTicket = function () {
    };
    return BaseLegal;
}());
exports.default = BaseLegal;
//# sourceMappingURL=BaseLegal.js.map