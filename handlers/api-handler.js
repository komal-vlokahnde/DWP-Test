const axios = require('axios');
const geolib = require('geolib');

 getUsersInCity = async(city) => {
  const url = "https://bpdts-test-app.herokuapp.com/city/"+city+"/users";

  // Get the response from the api
  let resp = await axios.get(url);
  return resp.data;
}

getAllUsers = async() => {
  const url = "https://bpdts-test-app.herokuapp.com/users";

  // Get the response from the api
  try {
    let resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    return [];
  }
}

getUsersWithin = async(lat, lon, distance) => {
    let users = await getAllUsers();

    var validUsers = [];
    users.forEach(user => {
        if (isCoordinatesWithinRange(distance, lat, lon, user)) {
            validUsers.push(user);
        }
    });
    return validUsers;
}





// ------- functions for use within the handlers above

function isCoordinatesWithinRange(distance, lat, lon, user) {
    let distanceBetween = geolib.getDistance({ latitude: lat, longitude: lon },
        { latitude: user.latitude, longitude: user.longitude });
    return getMiles(distanceBetween) <= distance;
}

// returns miles from meters
// meters => miles
function getMiles(i) {
    return i*0.000621371192;
}


module.exports = {
  getUsersInCity : getUsersInCity,
  getAllUsers : getAllUsers,
  getUsersWithin : getUsersWithin, 
  isCoordinatesWithinRange : isCoordinatesWithinRange //only exported for testing purposes
}