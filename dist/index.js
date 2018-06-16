"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('./app');
// const config = require('./config');
var config_1 = require("./config");
app.listen(config_1.default.port, function () {
    console.log("api rest corriendo en http://localhost:" + config_1.default.port);
});
//# sourceMappingURL=index.js.map