import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cors from "cors";
import userRoutes from "../routes/user.routes.js";

const app = express();

// loading environment variables
dotenv.config({path: "./env"});

//enabling cors for all origins
app.use(cors({origin: "*"}));

// middleware to parse and send json request and response
app.use(express.json());

//connecting the database when server is started 
connectDB();

app.get("/", async(req,res) => {
    res.status(200).json({
        message: "The API is working all right !!!"
    });
});

app.post("/api/users", userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () =>{
     console.log(`SERVER IS RUNNING ON PORT: ${port}`);
});