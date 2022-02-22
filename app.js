var createError = require('http-errors');
const express = require('express');

// routes
var apiRoute = require("./routes/api.js");

// Set up the express app
const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', apiRoute);


// 404: NOT FOUND errors
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports = app;
