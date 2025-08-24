import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["assault", "theft", "fraud", "vandelism", "others"],
        required: true
    },
    location:{
        type:{
            type: String,
            enum: ["point"],
            default: "point"
        },
        coordinates:{
            type: [Number],
            required: true
        },
        state:{ type: String, required: true },
        city: {type: String, required: true},
        district: {type: String, required: true}
    },
    status:{
        type: String,
        enum: ["open", "pending", "closed"],
        default: "open"
    },
    reporter:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    dateReported:{
        type: Date,
        default: Date.now
    }
},{timestamps: true});

export const Report = mongoose.model("Report", reportSchema);