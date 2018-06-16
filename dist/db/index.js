"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pool = require('pg').Pool;
var config_1 = require("../config");
var pool = new Pool({
    connectionString: config_1.default.db
});
module.exports = {
    query: function (text, params, callback) {
        return pool.query(text, params, callback);
    }
};
//# sourceMappingURL=index.js.map