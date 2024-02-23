import chats from "../models/chatSchema";

export const updateChat = async (to: string, from: string, message: string) => {
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
    const chat = await chats.findOne({ number1, number2 });
    if (!chat) {
        const newmessage = await chats.create({
            number1,
            number2,
            messages: [{
                message,
                from
            }]
        });
        if (!newmessage) return false;
    }
    else {
        chat.messages.push({
            message,
            from
        });
        await chat.save();
        if (!chat) return false;
    }
    return true;
}