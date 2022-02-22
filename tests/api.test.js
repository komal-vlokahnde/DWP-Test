const supertest = require('supertest')
const app = require('../app')
const apiHandler = require('../handlers/api-handler')

// Coordinates for London (used as default)
const latitude = 51.5074;
const longitude = 0.1278;

/* 
Must include tests:
  - Provide a few options that test the isCoordinatesWithinRange function works
  - Test the city endpoint with a valid city (London) and invalid city (random string)
  - Check that all the users from the herokuapp city api call appear in this api call
  - Check that all the users from the herokuapp users api within 50 miles of London call appear in this api call
*/

// Provide a few options that test the isCoordinatesWithinRange function works
describe('isCoordinatesWithinRange for london and London Eye', () => {
  it('should test that (51.503251, -0.119510) & London are within 50 miles === true', () => {
    const isWithin = apiHandler.isCoordinatesWithinRange(50, 51.503251, -0.119510, {latitude: latitude, longitude: longitude});
    expect(isWithin).toBe(true);
  });
});

describe('isCoordinatesWithinRange for london and somewhere in Exeter', () => {
  it('should test that (50.716055, -3.533289) & London are within 50 miles === false', () => {
    const isWithin = apiHandler.isCoordinatesWithinRange(50, 50.716055, -3.533289, {latitude: latitude, longitude: longitude});
    expect(isWithin).toBe(false);
  });
});

// Test the city endpoint with a valid city (London) and invalid city (random string)
describe('City enpoint with London', () => {
  it('should give atleast 1 user for city London', async () => {
    const res = await supertest(app)
      .get('/users/London');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('City enpoint with Random string "ahbrg"', () => {
  it('should give exatly 0 users for city "ahbrg"', async () => {
    const res = await supertest(app)
      .get('/users/ahbrg');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(0);
  });
});

// Check that all the users from the herokuapp city api call appear in this api call
describe('Herokuapp city api endpoint vs my api', () => {
  it('should find all users from Herokuapp city api in my api', async () => {
    const res = await supertest(app)
      .get('/');

    var foundAll = true;

    var herokuUsers = await apiHandler.getUsersInCity("London");
    var users = res.body;

    // loop through all the herokuapp endpoint users to see if they are in my api result
    herokuUsers.forEach(user => {
      if (!users.some(_user => _user.id === user.id)) {
        foundAll = false;
      }
    });

    expect(res.statusCode).toEqual(200);
    expect(foundAll).toBe(true);
  });
});

// Check that all the users from the herokuapp users api within 50 miles of London call appear in this api call
describe('Herokuapp users api endpoint vs my api', () => {
  it('should find all users from Herokuapp city api in my api', async () => {
    const res = await supertest(app)
      .get('/');

    var foundAll = true;

    // loop through all the herokuapp endpoint users to see if they are in my api result
    var herokuUsers = await apiHandler.getUsersWithin(latitude, longitude, 50);
    var users = res.body;

    herokuUsers.forEach(user => {
      if (!users.some(_user => _user.id === user.id)) {
        foundAll = false;
      }
    });

    expect(res.statusCode).toEqual(200);
    expect(foundAll).toBe(true);
  });
});

// Extra test to ensure we get a 404 status code when trying to get an invalid endpoint
describe('Check invalid endpoint', () => {
  it('Return statusCode 404', async () => {
    const res = await supertest(app)
      .get('/random');

    expect(res.statusCode).toEqual(404);
  });
});