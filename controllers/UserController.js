const express = require("express");
const router = express.Router();
const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('../jwt/jwt');
// create

const createUser = async(req,res)=>{
    try{
        const {username,password} = req.body;
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({error:"Username is already sparkling, sorry!"})
        }
        const hashedPassword = await bcrypt.hash(password,13);//this is how we use bcrypt to hash the password 
        // so only on matching hash we log in along with bcrypt we will also use jsonwebtoken for safe communication over every 
        // endpoint access

        const user = new User({username,password: hashedPassword}); 
        await user.save();
        // generating jwt token while register and as well as login 
        // by considering users attention span is crucial for social media applications
        const token = jwt.tokenGeneration({username:user.username})
        
        res.status(201).json({token,user,message:"User registration sparkled!"});
        console.log(user)

    }
    catch(error){
        console.log("Error in creating user:")
        res.status(400).json({ error: error.message });
        console.log(error)
        console.log("Request Body:", req.body);

    }
}

//to get all users
const getAllUsers = async(req,res)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({error:"Unauthorized"});
        }
        jwt.verifyToken(token)
        const users =await User.find();
        res.status(200).json(users)
    }catch(error){
        console.log("Error in getting all users")
        res.status(401).json({error:"some get all error"});
    }
}
// to get current user details 
const current = async (req, res) => {
    try {
        // console.log("cookie: ", req.headers);
        const { token } = req.headers;
// jwt check every where for secure communication in every step
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const decodeToken = jwt.verifyToken(token);

        const user = await User.findOne({ username:decodeToken.username });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getting current users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getUserbyUsername = async(req,res)=>{
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        jwt.verifyToken(token)
        const {username} = req.params
        console.log(req.params)
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({error:"Not found"})
        }
        res.status(200).json({user,message:"found sparkling user!!, UWU"})
    } catch (error) {
        console.log("Error in finding sparkling user")
    }
}

const updateUserByUsername = async (req, res) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const decodedToken = jwt.verifyToken(token);

        const username = decodedToken.username;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { ...req.body, username: decodedToken.username },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(400).json({ error: "Not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in updating the user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const logoutUser=(req,res)=>{
res.clearCookie('token').json("Logged out successfully")
}
module.exports={createUser,getAllUsers,getUserbyUsername,updateUserByUsername,logoutUser,current};