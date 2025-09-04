import { User } from "../models/user.model.js";
import { Report } from "../models/report.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//create a new user
export const registerUser = async (req, res) => {
  console.log("register endpoint hit with body: ", req.body);
  try {
    const { name, gender, email, password, role } = req.body;

    // checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists !!",
      });
    }

    //hashing the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    //create a new user
    const newUser = new User({
      name,
      gender,
      email,
      password: hashedPass,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully !!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error in registering user",
      error: error.message,
    });
  }
};

//user login controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credential",
      });
    }

    //check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "INVALID CREDENTIAL" });
    }

    //generate jwt token for login
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    // sending token and user info on successful login
    res.status(200).json({
      message: "LOGIN SUCCESSFUL",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error in login",
      error: error.message,
    });
  }
};

//get user profile+reports filled by the user
export const getProfile = async (req, res) => {
  try {
    //req.user is already given by protect middleware
    if (!req.user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //finding all the reports filled by the user
    const reports = await Report.find({ filter: req.user._id }).select(
      "_id title createdAt"
    );

    res.status(200).json({
      message: "Profile fetched successfully !!!",
      user: req.user,
      reports: {
        count: reports.length,
        list: reports,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching profile",
      error: error.message,
    });
  }
};
