const subject = require("../models/subject")
const createSubject = async (req,res) => {
    try {
        const {subjectName} = req.body;
        if (!subjectName || subjectName.trim() === "") {
            return res.status(400).json({ message: "Subject name is required" });
        }
        const subjectDetails = await subject.create({subjectName})
        res.status(201).json(subjectDetails)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAllSubjects = async (req,res) => {
    try {
        const subjects = await subject.find({isDeleted:false})
        res.status(200).json(subjects)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getSubjectById = async (req,res) => {
    try {
        const subjectDetails = await subject.findById(req.params.id)
        if (!subjectDetails || subjectDetails.isDeleted) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json(subjectDetails)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const updateSubject = async (req,res) => {
    try {
        const { subjectName } = req.body;
        if (!subjectName || subjectName.trim() === "") {
            return res.status(400).json({ message: "Subject name is required" });
        }
        const subjectDetails = await subject.findByIdAndUpdate(req.params.id,{subjectName},{new:true})
        if (!subjectDetails) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json(subjectDetails );
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteSubject = async (req,res) => {
    try {
        const subjectDetails = await subject.findByIdAndUpdate(req.params.id,{isDeleted:true,deletedAt:Date.now()},{new:true})
        if (!subjectDetails) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json({ message: "Subject soft deleted successfully" ,data:subjectDetails});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const restoreSubject = async (req,res) => {
    try {
        const subjectDetails = await subject.findByIdAndUpdate(req.params.id,{isDeleted:false,deletedAt:null},{new:true})
        if (!subjectDetails) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json({ message: "Subject restored successfully" ,data:subjectDetails});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={createSubject,getAllSubjects,getSubjectById,updateSubject,deleteSubject,restoreSubject}