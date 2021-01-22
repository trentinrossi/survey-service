const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true,
    },
    initialDate: {
      type: Date,
      required: true,
    },
    finalDate: {
      type: Date,
      required: true,
    },
    instructorName: {
      type: String,
      maxlength: 100,
    },
    evaluatorName: {
      type: String,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 255,
    },
    expirationDate: {
      type: Date,
    },
    objective: {
      type: String,
      maxlength: 255,
    },
    responseTime: {
      type: Number,
      max: 1440,
    },
    anonymous: {
      type: Boolean,
    },
    answerLink: {
      type: String,
      maxlength: 255,
    },
    titleIcon: {
      type: String,
      maxlength: 45,
    },
    subjects: [
      {
        id: { type: String, mandatory: true },
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model('Survey', surveySchema);
