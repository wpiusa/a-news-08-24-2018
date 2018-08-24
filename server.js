const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const article = require('./routes/api/article');
const category = require('./routes/api/category');
const notify = require('./routes/api/notify');
const org = require('./routes/api/org');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.use('/api/article', article);
app.use('/api/category', category);
app.use('/api/notify', notify);
app.use('/api/org', org);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
