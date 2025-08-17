const user = require("../models/user")
const bcrypt = require("bcryptjs");
const signup = async(req,res)=>{
    try{
        const {firstName , lastName , email , gender , password , batch , collegeName , contactNo} = req.body;
        const existingUser = await user.findOne({email})
        if(existingUser) return res.status(400).json({message:"Email already exists"})
        const newUser = await user.create({
            firstName,
            lastName,
            email,
            gender,
            password:await bcrypt.hash(password,10),
            batch,
            collegeName,
            contactNo
        })
        newUser.password=undefined
        res.status(201).json({message:"User Created successfully",user:{id:newUser._id,email:newUser.email,firstName:newUser.firstName,lastName:newUser.lastName,role:newUser.role,batch:newUser.batch,gender:newUser.gender}})
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

const login = async (req,res) => {
    try {
        const {email , password} = req.body;
        const existingUser = await user.findOne({email})
        if(!existingUser) return res.status(404).json({message:"Invalid credentials"})
        const isMatch = await bcrypt.compare(password,existingUser.password)
        if (!isMatch) return res.status(400).json({message:"Invalid credentials"})
        existingUser.password = undefined;
        res.status(200).json({message:"Login Successfully",data:existingUser})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllUsers = async (req,res) => {
    try {
        const users = await user.find().select("-password")
        res.status(200).json({data:users})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllStudents = async (req,res) => {
    try {
        const students = await user.find({role:"student"}).select("-password")
        res.status(200).json({data:students})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllFaculty = async (req,res) => {
    try {
        const faculty = await user.find({role:"faculty"}).select("-password")
        res.status(200).json({data:faculty})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={signup,login,getAllUsers,getAllStudents,getAllFaculty}