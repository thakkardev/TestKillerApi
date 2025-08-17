const user = require("../models/user")
const exam = require("../models/exam")
const bcrypt = require("bcryptjs")
const getDashboardStats = async (req, res) => {
    try {
        const adminCount = await user.countDocuments({ role: "admin" })
        const facultyCount = await user.countDocuments({ role: "faculty" })
        const studentCount = await user.countDocuments({ role: "student" })
        const totalExamCount = await exam.countDocuments({ isDeleted: false })
        const activeExamCount = await exam.countDocuments({ isDeleted: false, active: true })
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const newStudentCount = await user.countDocuments({
            role: "student",
            createdAt: { $gte: thirtyDaysAgo }
        });

        res.status(200).json({ adminCount, facultyCount, studentCount, totalExamCount, activeExamCount, newStudentCount })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const addStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, gender, password, batch, collegeName, contactNo } = req.body;
        const existingUser = await user.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "Email already exists" })
        const newUser = await user.create({
            firstName,
            lastName,
            email,
            gender,
            password: await bcrypt.hash(password, 10),
            batch,
            collegeName,
            contactNo
        })
        newUser.password = undefined
        res.status(201).json({ message: "User Created successfully", data: newUser })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const updateStudent = async (req, res) => {
    try {
        const studentDetails = await user.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!studentDetails) {
            res.status(404).json({ message: "Student not Found" })
        }
        res.status(200).json({ message: "Student update successfully", data: studentDetails })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const updateRole = async (req, res) => {
    try {
        const { role } = req.body
        if (!role) {
            res.status(400).json({ message: "Role is Required" })
        }
        const studentDetails = await user.findByIdAndUpdate(req.params.id, { role }, { new: true })
        if (!studentDetails) {
            res.status(404).json({ message: "Student not Found" })
        }
        res.status(200).json({ message: "role update successfully", data: studentDetails })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = { getDashboardStats, addStudent, updateStudent, updateRole }