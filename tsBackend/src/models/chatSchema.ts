import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    messages: [
        {
            message: String,
            from: String,
        }
    ],
    number1: String,
    number2: String
})

const chats = mongoose.model('chats', chatSchema);
export default chats;