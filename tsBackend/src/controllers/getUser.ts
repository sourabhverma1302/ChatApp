import registerUser from '../models/userRegister';
import { Response, Request } from 'express';
export const getUser = async (req: Request, res: Response) => {
    console.log("In GetUser");
    try {
        const allUsers = await registerUser.find({});
        res.status(200).json({ message: "Got All users", allUsers })
    }
    catch {
        res.status(301).json({ message: "No users" })
    }
}