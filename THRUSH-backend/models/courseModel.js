const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    id: {
      type: Number
    },
    type: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    coverImage: {
      type: String
    },
    author: {
      type: String
    },
    link: {
      type: String
    },
    wsl: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
