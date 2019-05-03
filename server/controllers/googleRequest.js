const api_key = require('../secret/api_key');

const googleMapsClient = require('@google/maps').createClient({
  key: api_key.API_KEY_GOOGLE_DIRECTIONS,
  Promise: Promise
});

function getDirections(req, res) {
  console.log(req.query.origin);
  console.log(req.query.destination);
  googleMapsClient.directions({
    origin: req.query.origin,
    destination: req.query.destination,
  })
    .asPromise()
    .then((response) => {
      // console.log(response.json.routes[0].legs);
      console.log(response);
      res.json(response.json.routes[0].overview_polyline);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getDirections
}
