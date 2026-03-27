import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true
    },
    lastName: {
        type: String,
        trim: true,
        lowerCase: true
    },
    email: {
        type: String,
        required: true,
        uniqued: true,
        lowerCase: true
    },
    phone: {
        type: Number,
        required: true,
        uniqued: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;
   return this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);