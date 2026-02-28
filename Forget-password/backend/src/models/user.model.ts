import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    refreshToken: string;
    resetPasswordToken?: string | undefined,
    resetPasswordExpires?: Date | undefined,
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: undefined
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date,
        default: undefined
    },
}, {
    timestamps: true
});

export const User: Model<IUser> = mongoose.model("User", userSchema)