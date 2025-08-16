const exam = require("../models/exam")
const createExam = async (req, res) => {
    try {
        const { title, description, subjectId, topicId, facultyId, marksPerQuestion, totalNumberOfQuestions, active, negative, mix, questions } = req.body
        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required" })
        }
        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }
        if (!subjectId || !topicId || !facultyId) {
            return res.status(400).json({ message: "Subject, Topic and Faculty IDs are required" });
        }
        if (!marksPerQuestion || !totalNumberOfQuestions) {
            return res.status(400).json({ message: "Marks per question and total number of questions are required" });
        }
        
        const examDetails = await exam.create({ title, description, subjectId, topicId, facultyId, marksPerQuestion, totalNumberOfQuestions, active, negative, mix, questions })
        res.status(201).json({ message: "Exam Created Succesfully", data: examDetails })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getAllExams = async (req, res) => {
    try {
        const exams = await exam.find({ isDeleted: false }).populate("subjectId", "subjectName").populate("topicId", "topicName").populate("facultyId", "firstName lastName")
        res.status(200).json({ data: exams })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getExamById = async (req, res) => {
    try {
        const examDetails = await exam.findById(req.params.id).populate("subjectId", "subjectName").populate("topicId", "topicName").populate("facultyId", "firstName lastName")
        if (!examDetails || examDetails.isDeleted) {
            res.status(404).json({ message: "Exam not found" })
        }
        res.status(200).json({ data: examDetails })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const updateExam = async (req, res) => {
    try {
        const examDetails = await exam.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!examDetails) {
            res.status(404).json({ message: "Exam not found" })
        }
        res.status(200).json({ message: "Exam Updated Successfully", data: examDetails })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const deleteExam = async (req, res) => {
    try {
        const examDetails = await exam.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true, deletedAt: Date.now() },
            { new: true }
        )
        if (!examDetails) {
            res.status(404).json({ message: "Exam not found" })
        }
        res.status(200).json({ message: "Exam soft Deleted  Successfully", data: examDetails })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const restoreExam = async (req, res) => {
    try {
        const examDetails = await exam.findByIdAndUpdate(
            req.params.id,
            { isDeleted: false, deletedAt: null },
            { new: true }
        )
        if (!examDetails) {
            res.status(404).json({ message: "Exam not found" })
        }
        res.status(200).json({ message: "Exam Restored Successfully", data: examDetails })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getExamQuestions = async (req, res) => {
    try {
        const examDetails = await exam.findById(req.params.id).populate({path:"questions",select:"-correctAns"})
        if (!examDetails) {
            res.status(404).json({ message: "Exam not found" })
        }
        res.status(200).json({data:examDetails})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getExamQuestionsWithAnswers = async (req,res) => {
    try {
        const examDetails = await exam.findById(req.params.id).populate("questions")
        if (!examDetails) {
            res.status(404).json({ message: "Exam not found" })
        }
        res.status(200).json({data:examDetails})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports={createExam,getAllExams,getExamById,updateExam,deleteExam,restoreExam,getExamQuestions,getExamQuestionsWithAnswers}