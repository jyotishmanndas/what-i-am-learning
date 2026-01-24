import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
    userName: string;
    name: string,
    password: string,
    refreshToken: string,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new Schema<IUser>({
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

export const User: Model<IUser> = mongoose.model("User", userSchema)