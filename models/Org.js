const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrgSchema = new Schema({
  orgname: {
    type: String,
    required: true
  },
  imgURL: {
    type: String,
    required: true
  },
  about1: {
    type: String,
    required: true
  },
  about2: {
    type: String,
  },
  about3: {
    type: [String],
  },
  support1: {
    type: String,
    required: true
  },
  support2: {
    type: String,
  },
  support3: {
    type: String,
  },
});

module.exports = Org = mongoose.model('org', OrgSchema);
