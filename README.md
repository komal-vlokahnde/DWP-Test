
### The initial breif is as follows:

  Please complete the online test following the link: https://bpdts-test-app.herokuapp.com
  
  The link contains a swagger spec for an API.
  
  Using the language of your choice please build your own API which calls the API at https://bpdts-test-app.herokuapp.com/, and returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

### London longitude and latitude

In order to get a starting point I first found the coordinates to start with for London. I simply typed "London longitude and latitude" whcih returned "51.5074° N, 0.1278° W" which would be Latitude: 51.5074 and Longitude: 0.1278. I have hardcoded this into my api.js file. Understandably these values will very much likely vary for different individuals depending on the source and the exactly location within London being used.

### Run Project

Once you have cloned this repository perform 'npm install' on the root directory. This will install the dependencies for the project (e.g. axios, express).
Once the install process is complete proceed to enter 'npm start' which should start the server. You should expect to see the following message in your terminal "Listening to requests on http://localhost:3000". This tells us that the server is accessible at http://localhost:3000. 

Use Postman to check api response.
Get - http://localhost:3000/users/London

### Testing Project

in order to test the project perform 'npm test' on the root directory. This will run a suite of test which cover all important bases of the api. These can be found in the file '/tests/api.test.js'.
