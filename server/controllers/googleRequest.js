const api_key = require('../secret/api_key');

const googleMapsClient = require('@google/maps').createClient({
  key: api_key.API_KEY_GOOGLE_DIRECTIONS,
  Promise: Promise
});

function getDirections(req, res) {
  googleMapsClient.directions({
    origin: req.query.origin,
    destination: req.query.destination,
  })
    .asPromise()
    .then((response) => {
      // console.log(response.json.routes[0].legs);
      res.json(response.json.routes[0].overview_polyline);
    })
    .catch((err) => {
      console.log(err);
    });
}

function getDirectionsByCommuneRue(depart, destination) {
  return new Promise((resolve, reject) => {
    googleMapsClient.directions({
      origin: depart,
      destination: destination,
    })
      .asPromise()
      .then((response) => {
        // console.log(response.json.routes[0].legs);
        // console.log(response.json.routes[0].overview_polyline);
        resolve(response.json.routes[0].overview_polyline);
      })
      .catch((err) => {
        reject(err);
      });
  })
}

function getCommuneAndRue(lat, long) {
  return new Promise ((resolve, reject) => {
    const tabLatLong = [lat, long];
    googleMapsClient.reverseGeocode({
      latlng: tabLatLong,
      result_type: ['street_address'],
      language: 'fr'
    })
      .asPromise()
      .then((response) => {
        let tabRes = response.json.results[0].address_components;
        let communeRes;
        let rueRes;
        for (let i = 0; i < tabRes.length; i++) {
          if (tabRes[i].types[0] === 'route') {
            rueRes = tabRes[i].long_name;
          } else if (tabRes[i].types[0] === 'locality') {
            communeRes = tabRes[i].long_name;
          }
        }
        const res = {
          commune: communeRes.toUpperCase(),
          rue: rueRes
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  })
}

module.exports = {
  getDirections,
  getDirectionsByCommuneRue,
  getCommuneAndRue
}
