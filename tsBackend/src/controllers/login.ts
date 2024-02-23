import { Request, Response } from "express";
import registerUser from "../models/userRegister";
import jwt from 'jsonwebtoken';
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log("phoneNumber", email);
        const checkUser = await registerUser.findOne({ email });
        if (!checkUser) {
            return res.status(303).json({ message: "User Not Found", success: false });
        }
        if (!password || password !== checkUser?.password) {
            return res.status(301).json({ message: "Credentials not correct", success: false });
        }
        const token = jwt.sign({
            user: {
                id: checkUser?._id,
                email: checkUser?.email,
                phoneNumber: checkUser?.phoneNumber
            }
        }, "Sourabh");
        res.cookie("jwt", token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
        return res.status(200).json({ message: "Logged In Success", success: true, checkUser });
    }
    catch (err) {
        return res.status(300).json({ message: 'Not Logged In', success: false });
    }
}