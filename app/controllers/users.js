const express = require('express');
const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const checkAuth = require('../middleware/check-auth');
const RestfulHelper = require('sequelize-restful-helper');
const users = express.Router();
const User = models.User;
const Expense = models.Expense;

// Show expenses
users.get('/expenses', checkAuth, (req, res, next) => {
  const whereObject = {};
  if (req.query === null) {
    whereObject.userId = req.userData.userId;
  } else {
    if (req.query.category && req.query.category !== '0') {
      whereObject.category = req.query.category;
    }
    if (req.query.fromDate && req.query.toDate) {
      whereObject.spentAt = {$between: [req.query.fromDate, req.query.toDate]}
    } else if (req.query.fromDate) {
      whereObject.spentAt = {$gte: req.query.fromDate}
    } else if (req.query.toDate) {
      whereObject.spentAt = {$lte: req.query.toDate}
    }
    whereObject.userId = req.userData.userId;
  }
  Expense.findAll({
    where: whereObject,
    order: [
      ['spentAt', 'DESC']
  ],
  }).then(expenses => {
    res.json(expenses);
  }).catch(error => {
    res.status(500).json(error);
  });
});


// Show info
users.get('/userInfo', checkAuth, (req, res, next) => {
  User.findById(req.userData.userId).then(user => {
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }).catch(error => {
    res.status(500).json(error);
  });
});

// Create
users.post('/registration', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      return res.status(409).json({
        message: 'Mail already exists'
      })
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
          }).then(user => {
            const token = jwt.sign({
              userId: user.id,
            }, "secret", {
              expiresIn: "24h"
            });
            res.status(200).json({
              user: user,
              token: token
            });
          }).catch(error => {
            res.status(500).json(error);
          });
        }
      });
    }
  });
});

// Login
users.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      if (result) {
        const token = jwt.sign({
          userId: user.id
        }, "secret", {
          expiresIn: "24h"
        });
        return res.status(200).json({
          message: 'Auth succesful',
          token: token
        });
      }
      res.status(401).json({
        message: 'Auth failed'
      });
    });
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

// Update
users.put('/profile', checkAuth, (req, res) => {
  User.findById(req.userData.userId).then((user) => {
    if (req.body.password) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json(err);
        } else {
          user.update({
            password: hash
          })
        }
      });
    }
    user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    })
  }).then(updatedUser => {
    res.status(200).json(updatedUser);
  }).catch(error => {
    res.status(500).json(error);
  });
});

module.exports = users;