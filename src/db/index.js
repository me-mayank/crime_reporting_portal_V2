import mongoose,{connect} from "mongoose";
import {DB_NAME} from "../constants.js";

const connectDB = async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log("DATABASE CONNECTED !!!");
    }
    catch(error){
        console.log("FAILED TO CONNECT TO DATABASE !!");
        process.exit(1);
    }
}

export default connectDB;