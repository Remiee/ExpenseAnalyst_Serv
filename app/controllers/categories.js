const express = require('express');
const categories = express.Router();
const models = require('../models');
const Category = models.Category;
const Expense = models.Expense;
const checkAuth = require('../middleware/check-auth');

// Show
categories.get('/', (req, res) => {
  Category.findAll().then(categories => {
    res.json(categories);
  }).catch(error => {
    res.status(500).json(error);
  });
});

// Create
categories.post('/', checkAuth, (req, res) => {
  Category.create({
    name: req.body.name
  }).then(category => {
    res.status(200).redirect('/');
  }).catch(error => {
    res.status(500).json(error);
  });
});

// Destroy
categories.delete('/:id', checkAuth, (req, res) => {
  Category.findById(req.params.id).then((category) => {
    category.destroy().then(() => {
      res.status(200).json({});
    });
  });
});

module.exports = categories;
