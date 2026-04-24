import mongoose, { Model, Schema } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
}, {
    timestamps: true
});

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)