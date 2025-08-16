const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
    required: true
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'topic',
    required: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  option1: {
    type: String,
    required: true,
    trim: true
  },
  option2: {
    type: String,
    required: true,
    trim: true
  },
  option3: {
    type: String,
    required: true,
    trim: true
  },
  option4: {
    type: String,
    required: true,
    trim: true
  },
  correctAns: {
    type: String,
    required: true,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
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
  }
});

module.exports = mongoose.model('question', questionSchema);