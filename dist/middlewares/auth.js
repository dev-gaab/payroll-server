"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jwt-simple");
var moment = require("moment");
var config_1 = require("../config");
function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorizacion' });
    }
    var token = req.headers.authorization.split(" ")[1];
    var payload = jwt.decode(token, config_1.default.SECRET_TOKEN);
    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'El Token ha expirado' });
    }
    req.user = payload.sub;
    next();
}
exports.isAuth = isAuth;
//# sourceMappingURL=auth.js.map