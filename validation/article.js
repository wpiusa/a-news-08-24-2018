const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateArticleInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.headerimgURL = !isEmpty(data.headerimgURL) ? data.headerimgURL : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.auther = !isEmpty(data.auther) ? data.auther : '';
  data.articleURL = !isEmpty(data.articleURL) ? data.articleURL : '';
  data.category = !isEmpty(data.category) ? data.category : '';
  
  
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Article title is required';
  }

  if (Validator.isEmpty(data.headerimgURL)) {
    errors.headerimgURL = 'Article header image field required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Article description field is required';
  }

  if (Validator.isEmpty(data.auther)) {
    errors.auther = 'Article author field is required';
  }
 
  if (!isEmpty(data.articleURL)) {
    if (!Validator.isURL(data.articleURL)) {
      errors.articleURL = 'Not a valid article URL';
    }
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Article category field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
