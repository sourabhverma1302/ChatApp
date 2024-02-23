"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./src/controllers/user");
const getUser_1 = require("./src/controllers/getUser");
const login_1 = require("./src/controllers/login");
const getChats_1 = require("./src/controllers/getChats");
const Router = express_1.default.Router();
Router.post('/signUp', user_1.signUp);
Router.get('/allUsers', getUser_1.getUser);
Router.post('/login', login_1.login);
Router.get('/getChats', getChats_1.getChats);
exports.default = Router;
