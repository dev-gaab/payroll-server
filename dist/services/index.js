"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jwt-simple");
var moment = require("moment");
var config_1 = require("../config");
function createToken(id) {
    var payload = {
        sub: id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config_1.default.SECRET_TOKEN);
}
exports.createToken = createToken;
//# sourceMappingURL=index.js.map