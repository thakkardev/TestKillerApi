const mongoose = require('mongoose');
const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'topic',
    required: true
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  marksPerQuestion: {
    type: Number,
    required: true,
    min: 1
  },
  totalNumberOfQuestions: {
    type: Number,
    required: true,
    min: 1
  },
  active: {
    type: Boolean,
    default: true
  },
  negative: {
    type: Boolean,
    default: false
  },
  mix: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question'
  }],
});

module.exports = mongoose.model('exam', examSchema);