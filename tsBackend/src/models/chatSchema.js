"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    messages: [
        {
            message: String,
            from: String,
        }
    ],
    number1: String,
    number2: String
});
const chats = mongoose_1.default.model('chats', chatSchema);
exports.default = chats;
