const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a test title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  subject: {
    type: String,
    required: [true, 'Please specify subject'],
    enum: ['Mathematics', 'Physics', 'Chemistry', 'Biology']
  },
  examType: {
    type: String,
    required: [true, 'Please specify exam type'],
    enum: ['JEE', 'NEET', 'Foundation']
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Please add test duration']
  },
  totalMarks: {
    type: Number,
    required: [true, 'Please add total marks']
  },
  passingMarks: {
    type: Number,
    required: [true, 'Please add passing marks']
  },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: Number,
      marks: Number,
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard']
      }
    }
  ],
  isPremium: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Test', testSchema);