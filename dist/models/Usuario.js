"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = require('../db');
var Usuario = /** @class */ (function () {
    // constructor
    function Usuario() {
        this.id = null;
        this.username = null;
        this.password = null;
        this.nombre = null;
        this.apellido = null;
        this.rol = null;
        this.estatus = null;
    }
    // Obtener todos los usuarios
    Usuario.prototype.index = function () {
        var sql = "SELECT * FROM usuario";
        db.query(sql)
            .then(function (res) {
            return { data: res.rows };
        })
            .catch(function (err) {
            return { error: err.stack };
        });
    };
    // buscar un usuario
    Usuario.prototype.find = function () {
        var sql = {
            text: 'SELECT * FROM usuario WHERE id=$1',
            values: [this.id]
        };
        db.query(sql)
            .then(function (res) {
            return { data: res.rows };
        })
            .catch(function (err) {
            return { error: err.stack };
        });
    };
    // ingresar un nuevo usuario
    Usuario.prototype.create = function () {
        var sql = {
            text: 'INSERT INTO usuario(id, username, password, nombre, apellido, rol, estatus) VALUES (default, $1, $2, $3, $4, $5, $6) ',
            values: [this.username, this.password, this.nombre, this.apellido, this.rol, this.estatus]
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
    // actualizar un usuario
    Usuario.prototype.update = function () {
        var sql = {
            text: 'UPDATE usuario SET nombre=$1, apellido=$2, rol=$3',
            values: [this.nombre, this.apellido, this.rol]
        };
        var resp = db.query(sql)
            .then(function (res) {
            return res;
        })
            .catch(function (err) {
            return { error: err.stack };
        });
    };
    // habilitar usuario
    Usuario.prototype.enable = function () {
        var sql = {
            text: 'UPDATE usuario SET estatus=$2 WHERE id=$1',
            values: [this.id, 'habilitado']
        };
        db.query(sql)
            .then(function (res) {
            return res;
        })
            .catch(function (err) {
            return { error: err.stack };
        });
    };
    // deshabilitar usuario
    Usuario.prototype.disable = function () {
        var sql = {
            text: 'UPDATE usuario SET estatus=$2 WHERE id=$1',
            values: [this.id, 'inhabilitado']
        };
        db.query(sql)
            .then(function (res) {
            return res;
        })
            .catch(function (err) {
            return { error: err.stack };
        });
    };
    Usuario.prototype.login = function () {
        var sql = {
            text: 'SELECT * FROM usuario WHERE username=$1 AND estatus=$2',
            values: [this.username, 'habilitado']
        };
        var resp = db.query(sql)
            .then(function (res) {
            return res.rows;
        })
            .catch(function (err) {
            return { error: err.stack };
        });
        return resp;
    };
    return Usuario;
}());
exports.default = Usuario;
//# sourceMappingURL=Usuario.js.map