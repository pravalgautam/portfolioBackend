// models/Portfolio.js

const mongoose = require('mongoose');

const SocialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: String,
  duration: String,
  description: String
});

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  socialMedia: [SocialMediaSchema],
  experience: [ExperienceSchema]
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
