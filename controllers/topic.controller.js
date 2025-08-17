const topic = require("../models/topic")
const createTopic = async (req, res) => {
    try {
        const { subject, topicName } = req.body;
        if (!subject) {
            res.status(400).json({ message: "Subject Id is required" })
        }
        if (!topicName || topicName.trim() === "") {
            res.status(400).json({ message: "Topic name is required" })
        }
        const topicDetails = await topic.create({ subject, topicName })
        const populatedTopic = await topic.findById(topicDetails._id).populate("subject");
        res.status(201).json(populatedTopic)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getAllTopic = async (req, res) => {
    try {
        const topics = await topic.find({ isDeleted: false }).populate('subject')
        res.status(200).json(topics );
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getTopicById = async (req, res) => {
    try {
        const topicDetails = await topic.findById(req.params.id).populate('subject')
        if (!topicDetails || topicDetails.isDeleted) {
            return res.status(404).json({ message: "Topic not found" });
        }
        res.status(200).json(topicDetails );
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const updateTopic = async (req, res) => {
    try {
        const { subject, topicName } = req.body;
        if (!topicName || topicName.trim() === "") {
            return res.status(400).json({ message: "Topic name is required" });
        }
        const topicDetails = await topic.findByIdAndUpdate(
            req.params.id,
            { subject, topicName },
            { new: true }
        );
        if (!topicDetails) {
            return res.status(404).json({ message: "Topic not found" });
        }
        res.status(200).json(topicDetails );
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const deleteTopic = async (req,res) => {
    try {
        const topicDetails = await topic.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true, deletedAt: Date.now() },
            { new: true }
        );
        if (!topicDetails) {
            return res.status(404).json({ message: "Topic not found" });
        }
        res.status(200).json(topicDetails );
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const restoreTopic = async (req,res) => {
    try {
        const topicDetails = await topic.findByIdAndUpdate(
            req.params.id,
            { isDeleted: false, deletedAt: null },
            { new: true }
        );
        if (!topicDetails) {
            return res.status(404).json({ message: "Topic not found" });
        }
        res.status(200).json(topicDetails );
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports={createTopic,getAllTopic,getTopicById,updateTopic,deleteTopic,restoreTopic}