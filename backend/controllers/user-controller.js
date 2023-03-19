import mongoose from "mongoose";
import User from "../models/User";
import bcryt from 'bcryptjs';

export const getAllUser = async(req, res, next) => {
    let users;
    try{
        users = await User.find();
    }catch(err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
}
export const getUser = async(req, res, next) => {
    let user;
    let id = req.params.id;
    try{
        user = await User.findById(id).populate('following').populate('followers');
    }catch(err) {
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ user });
}
// User1 wants to follow User2
export const follow = async(req, res, next) => {
    let User1, User2;
    let userId1 = req.params.id1, userId2 = req.params.id2;
    try {
        User1 = await User.findById(userId1);
        User2 = await User.findById(userId2);
        if (!User1) {
            return res.status(400).json({ message: "User1 does not Exist" });
        }
        else if (!User2) {
            return res.status(400).json({ message: "User2 does not Exist" });
        }   
        for (let i = 0; i < User2.followers.length; i ++)
        {
            if (User2.followers[i].toString() == userId1) {
                return res.status(500).json({ message: "User1 is already following User2" });
            }
        }
        try{
            const session = await mongoose.startSession();
            session.startTransaction();
            User2.followers.push(User1);
            await User2.save({ session });
            User1.following.push(User2);
            await User1.save({ session });
            await session.commitTransaction();
        }
        catch(err) {
            return console.log(err);
        }
    }
    catch(err){
        return console.log(err);
    }
    return res.status(200).json({message: "Followed Successfully" });
}

// User1 wants to unfollow User2
export const unfollow = async(req, res, next) => {
    let User1, User2;
    let userId1 = req.params.id1, userId2 = req.params.id2;
    try {
        User1 = await User.findById(userId1);
        User2 = await User.findById(userId2);
        if (!User1) {
            return res.status(400).json({ message: "User1 does not Exist" });
        }
        else if (!User2) {
            return res.status(400).json({ message: "User2 does not Exist" });
        }   
        let follow = false;
        for (let i = 0; i < User2.followers.length; i ++)
        {
            if (User2.followers[i].toString() == userId1) {
                follow = true;
            }
        }
        if (!follow) {
            return res.status(500).json({ message: "User1 is not following User2 so unfollow is invalid"});
        }
        try{
            const session = await mongoose.startSession();
            session.startTransaction();
            User2.followers.pull(User1);
            await User2.save({ session });
            User1.following.pull(User2);
            await User1.save({ session });
            await session.commitTransaction();
        }
        catch(err) {
            return console.log(err);
        }
    }
    catch(err){
        return console.log(err);
    }
    return res.status(200).json({message: "Unfollowed Successfully" });
}
export const signup = async(req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    }
    catch(err) {
        return console.log(err);
    }
    if (existingUser) {
        return res.status(400).json({ message: "User Already Exists! Login Instead"});
    }
    const hashedPassword = bcryt.hashSync(password);
    const user = new User({
        name, 
        email,
        password: hashedPassword,
        blogs: []
    });
    
    try {
        await user.save();
    }
    catch (err){
        return console.log(err);
    }
    return res.status(201).json({ user });
}

export const login = async(req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    }
    catch(err) {
        return console.log(err);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Couldn't find User by this Email"});
    }
    const isCorrectPassword = bcryt.compareSync(password, existingUser.password);
    if (!isCorrectPassword) {
        return res.status(400).json({ message: "Incorrect Password"}); 
    }
    return res.status(200).json({ message: "Login Successful", user: existingUser})
}

