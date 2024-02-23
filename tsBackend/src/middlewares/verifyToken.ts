import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(300).json({ message: 'UnAuthorized' });
    }
    var accessToken = "Sourabh";
    jwt.verify(token, accessToken, (err: any, decoded: any) => {
        if (err) {
            return res.status(404).json({ message: "UnAuthorized" });
        }
        req.user = decoded.user;
    });
    next();
}