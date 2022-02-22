var express = require('express');
const api = require('../handlers/api-handler');

var router = express.Router();

// Coordinates for London (used as default)
const latitude = 51.5074;
const longitude = 0.1278;

// a get for all users who live in London or are 50 miles within the preset lat/lon coordinates
router.get('/', async function(req, res, next) {
  let usersWithin = await api.getUsersWithin(req.query.latitude || latitude, req.query.longitude || longitude, req.query.distance || 50);
  let usersCity = await api.getUsersInCity(req.query.city || "London");

  // make copy of the users in London array
  var users = usersCity;

  // Loop through the array of usersWithin array to see if there are any duplicates
  usersWithin.forEach(_user => {
    // If current user is not a duplicate then add to users array
    if (!users.some(user => user.id === _user.id)) {
      users.push(_user);
    }
  });

  res.json(users);
});

// a get for the users in a specific city
router.get('/users/:city', async function(req, res, next) {
  const city = req.params.city;
  
  let users = await api.getUsersInCity(city);

  res.json(users);
});

// a get for the users on api database
router.get('/users', async function(req, res, next) {
  let users = await api.getAllUsers();

  res.json(users);
});

module.exports = router;
