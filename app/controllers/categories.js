const express = require('express');
const categories = express.Router();
const models = require('../models');
const Category = models.Category;
const Expense = models.Expense;
const checkAuth = require('../middleware/check-auth');

// Show
categories.get('/', checkAuth, (req, res) => {
  Category.findAll().then(categories => {
    res.json(categories);
  }).catch(error => {
    res.status(500).json(error);
  });
});

module.exports = categories;
