const Question = require("../models/question")
const createQuestion = async (req, res) => {
    try {
        const { subject, topic, question, option1, option2, option3, option4, correctAns, difficulty } = req.body
        if (!subject) {
            res.status(400).json({ message: "Subject Id is required" })
        }
        if (!topic) {
            res.status(400).json({ message: "Topic Id is required" })
        }
        if (!question || question.trim() == "") {
            res.status(400).json({ message: "Question is required" })
        }
        if (!option1 || !option2 || !option3 || !option4) {
            res.status(400).json({ message: "All option is required" })
        }
        if (!correctAns) {
            res.status(400).json({ message: "Correct Ans is required" })
        }
        if (!difficulty) {
            res.status(400).json({ message: "Difficulty is required" })
        }
        const questionDetails = await Question.create({ subject, topic, question, option1, option2, option3, option4, correctAns, difficulty })
        const populatedQuestion = await topic.findById(questionDetails._id).populate("subject").populate("topic");
        res.status(201).json(populatedQuestion)
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getAllQuestion = async (req, res) => {
    try {
        const questions = await Question.find({ isDeleted: false }).populate("subject").populate("topic")
        res.status(200).json(questions )
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getQuestionById = async (req, res) => {
    try {
        const questionDetails = await Question.findById(req.params.id).populate("subject").populate("topic")
        if (!questionDetails || questionDetails.isDeleted) {
            res.status(404).json({ message: "Question not found" })
        }
        res.status(200).json(questionDetails )
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const updateQuestion = async (req, res) => {
    try {
        const questionDetails = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!questionDetails) {
            res.status(404).json({ message: "Question not found" })
        }
        res.status(200).json({ message: "Question Updated successfully", data: questionDetails })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const deleteQuestion = async (req, res) => {
    try {
        const questionDetails = await Question.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true, deletedAt: Date.now() },
            { new: true }
        )
        if (!questionDetails) {
            res.status(404).json({ message: "Question not found" })
        }
        res.status(200).json({ message: "Question deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const restoreQuestion = async (req, res) => {
    try {
        const questionDetails = await Question.findByIdAndUpdate(
            req.params.id,
            { isDeleted: false, deletedAt: null },
            { new: true }
        )
        if (!questionDetails) {
            res.status(404).json({ message: "Question not found" })
        }
        res.status(200).json({ message: "Question restored successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
module.exports = { createQuestion, getAllQuestion, getQuestionById, updateQuestion, deleteQuestion, restoreQuestion }