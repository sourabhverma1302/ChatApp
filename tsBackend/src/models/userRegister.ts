import mongoose, { Schema, Model, Document } from "mongoose";

interface userRegitserSchema extends Document {
    name: String,
    email: String,
    phoneNumber: String,
    password: String
}

const regsiterSchema = new Schema<userRegitserSchema>({
    name: {
        type: String,
        required: [true, "Please enter a valid name"],
    },
    email: {
        type: String,
        required: [true, "Please enter a valid email"],
        unique: true
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter a valid phoneNumber"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a specific pass"],
    }
});

const registerModel: Model<userRegitserSchema> = mongoose.models.registers || mongoose.model("registers", regsiterSchema);
export default registerModel;