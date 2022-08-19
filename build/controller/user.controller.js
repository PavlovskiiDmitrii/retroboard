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
exports.userController = void 0;
var db_1 = __importDefault(require("../db/db"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    // реализовано в auth.controller.singup
    // async createUser(req : any, res: any) {
    //     const {name, role, email, password} = req.body;
    //     try {
    //         db.pool.query(`INSERT INTO client (name, role, email, password) values ($1, $2, $3, $4) RETURNING *`, [name, role, email, password]).then((data) => {
    //             res.json(data.rows);
    //         });
    //     } catch (error) {
    //         res.status(500).send(`Пользователь не создан`);
    //     }
    // }
    UserController.prototype.getUsersCheck = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, rows, hash, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        console.log('getUsersCheck');
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, db_1.default.pool.query('SELECT * from client where email = $1', [email])];
                    case 2:
                        rows = (_b.sent()).rows;
                        if (!rows[0]) {
                            res.status(400).send("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D");
                            return [2 /*return*/];
                        }
                        hash = rows[0].password;
                        if (password === hash) {
                            res.status(200).json({ message: 'OK' });
                        }
                        else {
                            res.status(401).json('Пароль не правильный');
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _b.sent();
                        res.status(500).send("\u0447\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A, \u043F\u0430\u0440\u043E\u043B\u044C \u0438\u043B\u0438 \u0435\u043C\u0430\u0439\u043B \u043D\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.pool.query('SELECT * from client')];
                    case 1:
                        users = _a.sent();
                        res.json(users.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getOneUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, db_1.default.pool.query('SELECT * from client where id = $1', [id])];
                    case 1:
                        user = _a.sent();
                        res.json(user.rows[0]);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, name, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, name = _a.name;
                        return [4 /*yield*/, db_1.default.pool.query("UPDATE client set name = $1 where id = $2 RETURNING *", [name, id])];
                    case 1:
                        user = _b.sent();
                        res.json(user.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, db_1.default.pool.query('DELETE FROM client where id = $1', [id])];
                    case 1:
                        user = _a.sent();
                        res.json(user.rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.userController = new UserController();
