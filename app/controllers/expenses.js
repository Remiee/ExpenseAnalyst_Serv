const express = require('express');
const expenses = express.Router();
const models = require('../models');
const Expense = models.Expense;
const Category = models.Category;
const checkAuth = require('../middleware/check-auth');

// Create
expenses.post('/', checkAuth, (req, res) => {
    Expense.create({
      userId: req.userData.userId,
      category: req.body.category,
      amount: parseInt(req.body.amount),
      comment: req.body.comment,
      spentAt: req.body.spentAt
    }).then(expense => {
    res.status(200).json(expense);
  }).catch(error => {
    res.status(500).json(error);
  });
});

// Destroy
expenses.delete('/:id', checkAuth, (req, res) => {
  Expense.findById(req.params.id).then((expense) => {
    expense.destroy().then(() => {
      res.status(200).json({});
    });
  });
});

module.exports = expenses;