const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateCategoryInput = require('../../validation/category');


// Load Category Model
const Category = require('../../models/Category');

// @route   GET api/category
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Category.find()
       .then(category => {
        if (!category) {
          errors.nocategory = 'There is no category';
          return res.status(404).json(errors);
        }
        res.json(category);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/category/all
// @desc    Get all categories
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Category.find()
    .then(categories => {
      if (!categories) {
        errors.nocategories = 'There are no categories';
        return res.status(404).json(errors);
      }

      res.json(categories);
    })
    .catch(err => res.status(404).json({ categories: 'There are no categories' }));
});

// @route   GET api/article/category/:category
// @desc    Get category by category
// @access  Public

router.get('/category/:category', (req, res) => {
  const errors = {};

  Category.findOne({ category: req.params.category })
     .then(category => {
      if (!category) {
        errors.nocategory = 'There is no category !';
        res.status(404).json(errors);
      }

      res.json(category);
    })
    .catch(err => res.status(404).json(err));
});


// @route   POST api/category
// @desc    Create or edit category
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const categoryFields = {};
    
    if (req.body.category) categoryFields.category = req.body.category;
        
    Category.findOne({ category: req.params.category }).then(category => {
      if (category) {
        // Update
        Category.findOneAndUpdate(
          { $set: categoryFields },
          { new: true }
        ).then(category => res.json(category));
      } else {
        // Create

        // Check if handle exists
        Category.findOne({ category: categoryFields.category }).then(category => {
          if (category) {
            errors.category = 'That category already exists';
            res.status(400).json(errors);
          }

          // Save Category
          new Category(categoryFields).save().then(category => res.json(category));
        });
      }
    });
  }
);


// @route   DELETE api/category
// @desc    Delete category
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Category.findOneAndRemove({ category: req.params.category }).then(() => {
     console.log('deleted category!')
    });
  }
);

module.exports = router;
