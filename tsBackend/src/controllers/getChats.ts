import { Request, Response } from "express";
import chats from "../models/chatSchema";

export const getChats = async (req: Request, res: Response) => {
    const { to, from } = req.query;
    console.log("to", to, from);
    try {
        if (!to || !from) {
            return res.status(300).json({ message: "give both users" })
        }
        var allChats;
        if (to < from) {
            allChats = await chats.findOne({ number1: to, number2: from });
        }
        else if (to > from) {
            allChats = await chats.findOne({ number1: from, number2: to });
        }
        return res.status(200).json(allChats );
    } catch (error) {
        return res.status(301).json({ message: 'not chat found' });
    }
};