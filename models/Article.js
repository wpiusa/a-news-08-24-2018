const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  headerimgURL: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  auther: {
    type: String,
    required: true
  },
  articleURL: {
    type: [String],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Article = mongoose.model('article', ArticleSchema);
