import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        enum: ["male", "female"],
        required: true
    },
    email: {
        type: String,
        required: [true, "EMAIL IS REQUIRED"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "PASSWORD IS REQUIRED"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
},{timestamps: true});

export const User = mongoose.model("User", userSchema);