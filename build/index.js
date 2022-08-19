"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var room_routes_1 = __importDefault(require("./routes/room.routes"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', user_routes_1.default);
app.use('/api', room_routes_1.default);
app.use('/api', auth_routes_1.default);
app.get('/', function (req, res) {
    res.send('Well doddne!');
});
app.listen(process.env.PORT, function () {
    console.log("On port localhost:".concat(process.env.PORT));
});
