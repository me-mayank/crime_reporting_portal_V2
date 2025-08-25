import { User } from "../models/user.model.js";
import bycrpt from "bcrypt";

//create a new user
export const registerUser = async(req,res) => {
    try{
       const {name, gender, email, password, role} = req.body;
       
       // checking if the user already exists
       const existingUser = await User.findOne({email});
       if(existingUser){
         res.status(200).json({
            message: "User already exists !!"
         });
       }

       //hashing the password before storing 
       const salt = await bycrpt.genSalt(10);
       const hashedPass = await bycrpt.hash(password, salt);

       //create a new user
       const newUser = new User({
          name,
          gender,
          email,
          password: hashedPass
       });

       await newUser.save();

       res.status(201).json({
          message: "User created successfully !!",
          user:{
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
          }
       });
    }
    catch(error){
        res.status(500).json({
            message: "Server error in registering user",
            error: error.message
        });
    }
};