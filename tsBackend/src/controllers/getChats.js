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
exports.getChats = void 0;
const chatSchema_1 = __importDefault(require("../models/chatSchema"));
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, from } = req.query;
    console.log("to", to, from);
    try {
        if (!to || !from) {
            return res.status(300).json({ message: "give both users" });
        }
        var allChats;
        if (to < from) {
            allChats = yield chatSchema_1.default.findOne({ number1: to, number2: from });
        }
        else if (to > from) {
            allChats = yield chatSchema_1.default.findOne({ number1: from, number2: to });
        }
        return res.status(200).json(allChats);
    }
    catch (error) {
        return res.status(301).json({ message: 'not chat found' });
    }
});
exports.getChats = getChats;
