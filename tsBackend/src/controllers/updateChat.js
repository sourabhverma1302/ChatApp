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
exports.updateChat = void 0;
const chatSchema_1 = __importDefault(require("../models/chatSchema"));
const updateChat = (to, from, message) => __awaiter(void 0, void 0, void 0, function* () {
    var number1 = "";
    var number2 = "";
    if (to < from) {
        number1 = to;
        number2 = from;
    }
    else if (to > from) {
        number1 = from;
        number2 = to;
    }
    const chat = yield chatSchema_1.default.findOne({ number1, number2 });
    if (!chat) {
        const newmessage = yield chatSchema_1.default.create({
            number1,
            number2,
            messages: [{
                    message,
                    from
                }]
        });
        if (!newmessage)
            return false;
    }
    else {
        chat.messages.push({
            message,
            from
        });
        yield chat.save();
        if (!chat)
            return false;
    }
    return true;
});
exports.updateChat = updateChat;
