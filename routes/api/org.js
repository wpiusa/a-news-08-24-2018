const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateOrgInput = require('../../validation/org');

// Load Org Model
const Org = require('../../models/Org');


// @route   GET api/article
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Org.find()
       .then(org => {
        if (!org) {
          errors.noorg = 'There is no org';
          return res.status(404).json(errors);
        }
        res.json(org);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/org/all
// @desc    Get all org
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Org.find()
    .then(org => {
      if (!org) {
        errors.noorg = 'There are no org';
        return res.status(404).json(errors);
      }

      res.json(org);
    })
    .catch(err => res.status(404).json({ org: 'There are no org' }));
});


// @route   POST api/org
// @desc    Create or edit org
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOrgInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    
    // Get fields
    const orgFields = {};
    
    if (req.body.orgname) orgFields.orgname = req.body.orgname;
    if (req.body.imgURL) orgFields.imgURL = req.body.imgURL;
    if (req.body.about1) orgFields.about1 = req.body.about1;
    if (req.body.support1) orgFields.support1 = req.body.support1;
        
    Org.findOne({ orgname: req.params.orgname }).then(org => {
      if (org) {
        // Update
        Org.findOneAndUpdate(
          { $set: orgFields },
          { new: true }
        ).then(org => res.json(org));
      } else {
        // Create

        // Check if handle exists
        Org.findOne({ orgname: orgFields.orgname }).then(org => {
          if (org) {
            errors.orgname = 'That org name already exists';
            res.status(400).json(errors);
          }

          // Save Article
          new Org(orgFields).save().then(org => res.json(org));
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
    Org.findOneAndRemove({ orgname: req.params.orgname }).then(() => {
     console.log('deleted org!')
    });
  }
);

module.exports = router;
