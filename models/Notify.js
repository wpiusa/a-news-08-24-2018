const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NotifySchema = new Schema({
  deviceid: {
    type: String,
    required: true
  },
  category:[ {
    type: String,
    required: true
  }],
  token: {
    type: String,
    required: true
  },
  
});

module.exports = Notify = mongoose.model('notify', NotifySchema);
