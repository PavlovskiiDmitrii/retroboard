"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomController = void 0;
var db_1 = __importDefault(require("../db/db"));
var RoomController = /** @class */ (function () {
    function RoomController() {
    }
    RoomController.prototype.createRoom = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, owner_id, title, newRoom;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, owner_id = _a.owner_id, title = _a.title;
                        return [4 /*yield*/, db_1.default.pool.query("INSERT INTO room (owner_id, title) values ($1, $2) RETURNING *", [owner_id, title])];
                    case 1:
                        newRoom = _b.sent();
                        res.json(newRoom.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    RoomController.prototype.getRoom = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, db_1.default.pool.query('SELECT * from room where room_id = $1', [id])];
                    case 1:
                        room = _a.sent();
                        res.json(room.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    RoomController.prototype.getRoomByAdmin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, rooms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id;
                        return [4 /*yield*/, db_1.default.pool.query('SELECT * from room where owner_id = $1', [id])];
                    case 1:
                        rooms = _a.sent();
                        res.json(rooms.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    RoomController.prototype.addClientToRoom = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, room_id, clientsId, room;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, room_id = _a.room_id, clientsId = _a.clientsId;
                        return [4 /*yield*/, db_1.default.pool.query("UPDATE room set clients_id = $1 where room_id = $2 RETURNING *", [clientsId, room_id])];
                    case 1:
                        room = _b.sent();
                        res.json(room.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    RoomController.prototype.deleteRoom = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, db_1.default.pool.query('DELETE FROM room where room_id = $1', [id])];
                    case 1:
                        room = _a.sent();
                        res.json(room.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    return RoomController;
}());
exports.roomController = new RoomController();
