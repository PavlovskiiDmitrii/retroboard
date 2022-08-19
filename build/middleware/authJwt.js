"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_config_1 = require("../config/auth.config");
var verifyToken = function (req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json("Not token");
    }
    jsonwebtoken_1.default.verify(token, auth_config_1.authConfig.accessToken.salt, function (err, decoded) {
        if (err) {
            return res.status(403).json({ message: "BAD TOKEN", err: err });
        }
        req.userId = decoded.id;
        next();
    });
};
exports.verifyToken = verifyToken;
