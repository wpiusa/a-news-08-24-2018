const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateArticleInput = require('../../validation/article');


// Load Article Model
const Article = require('../../models/Article');
// Load User Model
const User = require('../../models/User');

// @route   GET api/article/test
// @desc    Tests article route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Article Works' }));

// @route   GET api/article
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Article.find()
       .then(article => {
        if (!article) {
          errors.noarticle = 'There is no article';
          return res.status(404).json(errors);
        }
        res.json(article);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/article/all
// @desc    Get all articles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Article.find()
    .then(articles => {
      if (!articles) {
        errors.noarticle = 'There are no articles';
        return res.status(404).json(errors);
      }

      res.json(articles);
    })
    .catch(err => res.status(404).json({ article: 'There are no articles' }));
});

// @route   GET api/article/title/:title
// @desc    Get article by title
// @access  Public

router.get('/title/:title', (req, res) => {
  const errors = {};

  Article.findOne({ title: req.params.title })
     .then(article => {
      if (!article) {
        errors.noarticle = 'There is no article!';
        res.status(404).json(errors);
      }

      res.json(article);
    })
    .catch(err => res.status(404).json(err));
});


// @route   POST api/article
// @desc    Create or edit article
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateArticleInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const articleFields = {};
    
    if (req.body.title) articleFields.title = req.body.title;
    if (req.body.headerimgURL) articleFields.headerimgURL = req.body.headerimgURL;
    if (req.body.description) articleFields.description = req.body.description;
    if (req.body.auther) articleFields.auther = req.body.auther;
    if (req.body.articleURL) articleFields.articleURL = req.body.articleURL;
    if (req.body.category) articleFields.category = req.body.category;
    
    

    Article.findOne({ title: req.params.title }).then(article => {
      if (article) {
        // Update
        Article.findOneAndUpdate(
          { $set: articleFields },
          { new: true }
        ).then(article => res.json(article));
      } else {
        // Create

        // Check if handle exists
        Article.findOne({ title: articleFields.title }).then(article => {
          if (article) {
            errors.title = 'That title already exists';
            res.status(400).json(errors);
          }

          // Save Article
          new Article(articleFields).save().then(article => res.json(article));
        });
      }
    });
  }
);


// @route   DELETE api/article
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Article.findOneAndRemove({ title: req.params.title }).then(() => {
     console.log('deleted article!')
    });
  }
);

module.exports = router;
