"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
exports.authConfig = {
    accessToken: {
        salt: "secret",
        expired: "10min",
        type: 'access'
    },
    refreshToken: {
        salt: "secret",
        expired: "30min",
        type: 'refresh'
    }
};
