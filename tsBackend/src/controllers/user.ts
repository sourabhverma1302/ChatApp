import { Response, Request } from 'express';
import registerUser from '../models/userRegister'
export const signUp = async (req: Request, res: Response) => {
    console.log("in");
    try {
        const { name, email, phoneNumber, password } = req.body;
        const newUser = await registerUser.create({
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
        res.status(404).json({ message: `Failed With Error ${err}` })
    }
}