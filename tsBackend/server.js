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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const ws_1 = require("ws");
const router_1 = __importDefault(require("./router"));
const url_1 = __importDefault(require("url"));
const updateChat_1 = require("./src/controllers/updateChat");
const app = (0, express_1.default)();
const cors = require('cors');
app.use(express_1.default.json());
app.use(cors());
const corsOptions = {
    origin: ['*'],
    credentials: true
};
app.use(cors(corsOptions));
mongoose_1.default.connect('mongodb+srv://vermasourabh512:Sourabh%4013@cluster0.bm7g5yb.mongodb.net/')
    .then(() => { console.log("connected to db"); });
app.use(router_1.default);
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
var users = [];
wss.on('connection', (ws, req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connected WebSocket Server");
    const uri = url_1.default.parse(req.url, true);
    const { phoneNumber } = uri.query;
    console.log("number", phoneNumber);
    if (phoneNumber) {
        users.push({ phoneNumber: phoneNumber === null || phoneNumber === void 0 ? void 0 : phoneNumber.toString(), ws });
    }
    ;
    console.log("users backend", users);
    ws.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("In on msg backend");
        const mymessage = JSON.parse(message);
        console.log("msg", mymessage);
        yield (0, updateChat_1.updateChat)(mymessage.to, mymessage.from, mymessage.message);
        users.forEach((item) => {
            if (item.phoneNumber === (mymessage === null || mymessage === void 0 ? void 0 : mymessage.to)) {
                item.ws.send(JSON.stringify(mymessage));
            }
        });
    }));
    ws.on('close', () => {
        console.log("Connection Closed");
        users = users.filter((user) => user.ws !== ws);
    });
}));
server.listen(3003, () => {
    console.log("Connected");
});
