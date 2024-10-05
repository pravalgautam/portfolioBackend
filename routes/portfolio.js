// routes/portfolio.js

const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// @route   GET /api/portfolio
// @desc    Get portfolio data
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message }) ;
  }
});

// @route   POST /api/portfolio
// @desc    Create or update portfolio data
router.post('/', async (req, res) => {
  const { title, description, socialMedia, experience } = req.body;

  try {
    let portfolio = await Portfolio.findOne();
    if (portfolio) {
      // Update existing portfolio
      portfolio.title = title || portfolio.title;
      portfolio.description = description || portfolio.description;
      portfolio.socialMedia = socialMedia || portfolio.socialMedia;
      portfolio.experience = experience || portfolio.experience;
      await portfolio.save();
      return res.json(portfolio);
    }

    // Create new portfolio
    portfolio = new Portfolio({
      title,
      description,
      socialMedia,
      experience
    });

    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Additional routes (e.g., PUT, DELETE) can be added as needed

module.exports = router;
