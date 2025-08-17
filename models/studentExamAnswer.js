const mongoose = require('mongoose');
const studentExamAnswerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'exam',
    required: true
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question',
      required: true
    },
    selectedAnswer: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  }],
  totalScore: {
    type: Number,
    default: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('studentExamAnswer', studentExamAnswerSchema);