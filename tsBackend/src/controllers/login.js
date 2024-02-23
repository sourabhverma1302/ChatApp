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
exports.login = void 0;
const userRegister_1 = __importDefault(require("../models/userRegister"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log("phoneNumber", email);
        const checkUser = yield userRegister_1.default.findOne({ email });
        if (!checkUser) {
            return res.status(303).json({ message: "User Not Found", success: false });
        }
        if (!password || password !== (checkUser === null || checkUser === void 0 ? void 0 : checkUser.password)) {
            return res.status(301).json({ message: "Credentials not correct", success: false });
        }
        const token = jsonwebtoken_1.default.sign({
            user: {
                id: checkUser === null || checkUser === void 0 ? void 0 : checkUser._id,
                email: checkUser === null || checkUser === void 0 ? void 0 : checkUser.email,
                phoneNumber: checkUser === null || checkUser === void 0 ? void 0 : checkUser.phoneNumber
            }
        }, "Sourabh");
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        return res.status(200).json({ message: "Logged In Success", success: true, checkUser });
    }
    catch (err) {
        return res.status(300).json({ message: 'Not Logged In', success: false });
    }
});
exports.login = login;
