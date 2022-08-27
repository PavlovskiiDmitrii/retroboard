"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var room_controller_1 = require("../controller/room.controller");
var express = __importStar(require("express"));
var authJwt_1 = require("../middleware/authJwt");
var roomRouter = express.Router();
var mainMiddleware = [authJwt_1.verifyToken];
roomRouter.post('/room', mainMiddleware, room_controller_1.roomController.createRoom);
roomRouter.post('/room/addclient', mainMiddleware, room_controller_1.roomController.addClientToRoom);
roomRouter.get('/room/:id', mainMiddleware, room_controller_1.roomController.getRoom);
roomRouter.get('/rooms/', mainMiddleware, room_controller_1.roomController.getRoomsByClientId);
roomRouter.delete('/room/', mainMiddleware, room_controller_1.roomController.deleteRoom);
exports.default = roomRouter;
