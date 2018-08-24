const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateNotifyInput = require('../../validation/notify');

// Load Notify Model
const Notify = require('../../models/Notify');

// @route   GET api/notify
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Notify.find()
       .then(notify => {
        if (!notify) {
          errors.nonotify = 'There is no notification';
          return res.status(404).json(errors);
        }
        res.json(notify);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/notify/all
// @desc    Get all notifications
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Notify.find()
    .then(notifications => {
      if (!notifications) {
        errors.nonotifications = 'There are no notifications';
        return res.status(404).json(errors);
      }

      res.json(notifications);
    })
    .catch(err => res.status(404).json({ notifications: 'There are no notifications' }));
});

router.get('/deviceid/:deviceid', (req, res) => {
  const errors = {};

  Notify.findOne({ deviceid: req.params.deviceid })
     .then(notify => {
      if (!notify) {
        errors.notify = 'There is no notificatiion !';
        res.status(404).json(errors);
      }

      res.json(notify);
    })
    .catch(err => res.status(404).json(err));
});


// @route   POST api/notify
// @desc    Create or edit notifications
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNotifyInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const notifyFields = {};
    
    if (req.body.deviceid) notifyFields.deviceid = req.body.deviceid;
    if (req.body.category) notifyFields.category = req.body.category;
    if (req.body.token) notifyFields.token = req.body.token;
        
    Notify.findOne({ deviceid: req.params.deviceid }).then(notify => {
      if (notify) {
        // Update
        Notify.findOneAndUpdate(
          { $set: notifyFields },
          { new: true }
        ).then(notify => res.json(notify));
      } else {
        // Create

        // Check if handle exists
        Notify.findOne({ deviceid: notifyFields.deviceid }).then(deviceid => {
          if (deviceid) {
            errors.deviceid = 'That device id already exists';
            res.status(400).json(errors);
          }

          // Save Category
          new Notify(notifyFields).save().then(notify => res.json(notify));
        });
      }
    });
  }
);



module.exports = router;
