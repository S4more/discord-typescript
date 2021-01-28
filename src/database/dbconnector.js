"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
exports.default = new pg_1.Pool({
    max: 20,
    connectionString: 'postgres://pi:86491300@192.168.2.200:5432/dawson',
    idleTimeoutMillis: 30000
});
