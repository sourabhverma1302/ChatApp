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
exports.signUp = void 0;
const userRegister_1 = __importDefault(require("../models/userRegister"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in");
    try {
        const { name, email, phoneNumber, password } = req.body;
        const newUser = yield userRegister_1.default.create({
            name,
            email,
            phoneNumber,
            password
        });
        if (!newUser) {
            return res.status(300).json({ message: 'user not created' });
        }
        res.status(200).json({ message: 'User Created Success' });
    }
    catch (err) {
        res.status(404).json({ message: `Failed With Error ${err}` });
    }
});
exports.signUp = signUp;
