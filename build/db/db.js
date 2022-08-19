"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var poolConfig = {
    database: 'retro_board',
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
};
var Database = /** @class */ (function () {
    function Database() {
        this.pool = new pg_1.Pool(poolConfig);
    }
    return Database;
}());
var db = new Database();
exports.default = db;
