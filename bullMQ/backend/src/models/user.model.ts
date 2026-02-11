import mongoose, { Document, Model, Schema } from "mongoose";


export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    refreshToken: string,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
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