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
var group_controller_1 = require("../controller/group.controller");
var tgroup_clients_id_controller_1 = require("../controller/tgroup_clients_id.controller");
var express = __importStar(require("express"));
var authJwt_1 = require("../middleware/authJwt");
var groupRouter = express.Router();
var mainMiddleware = [authJwt_1.verifyToken];
groupRouter.post('/group', mainMiddleware, group_controller_1.groupController.createGroup);
groupRouter.get('/groupsby', mainMiddleware, group_controller_1.groupController.getGroupsByClientId);
// roomRouter.put('/room/addclient', mainMiddleware, roomController.addClientToRoom);
// roomRouter.get('/group/:id', mainMiddleware, roomController.getRoom);
// roomRouter.get('/rooms/', mainMiddleware, roomController.getRoomByAdmin);
groupRouter.delete('/group/', mainMiddleware, group_controller_1.groupController.deleteGroup);
groupRouter.post('/createconnectionfroupwithclient', mainMiddleware, tgroup_clients_id_controller_1.group_clients_idController.createConnectionGroupWithClient);
groupRouter.get('/clientsby', mainMiddleware, tgroup_clients_id_controller_1.group_clients_idController.getClientsByGroupId);
groupRouter.get('/groupsIdby', mainMiddleware, tgroup_clients_id_controller_1.group_clients_idController.getGroupsIdByClientId);
exports.default = groupRouter;
