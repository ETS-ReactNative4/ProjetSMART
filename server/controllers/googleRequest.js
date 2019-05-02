const api_key = require('../secret/api_key');

const googleMapsClient = require('@google/maps').createClient({
  key: api_key.API_KEY_GOOGLE_DIRECTIONS,
  Promise: Promise
});

function getDirections(req, res) {
  googleMapsClient.directions({
    origin: 'Town Hall, Sydney, NSW',
    destination: 'Parramatta, NSW',
  })
    .asPromise()
    .then((response) => {
      res.json(response.json.routes[0].overview_polyline);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getDirections
}
