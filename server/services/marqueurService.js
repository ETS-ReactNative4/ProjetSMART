const { Marqueur } = require('../models/index');

async function addMarqueurTroncon(unCodeTroncon, probleme, uneLatitude, uneLongitude, date, res) {
  const nouveauMarqueur = new Marqueur({
    Categorie: probleme,
    DateAjout: date,
    codeTroncon : unCodeTroncon,
    latitude : uneLatitude,
    longitude : uneLongitude,
  });
  nouveauMarqueur.save();
  return nouveauMarqueur;
}

async function getallMarqueurById(listeCodeTroncon) {
  // let marqueurDeMort = new Marqueur({codeTroncon:"T25236", latitude: 45.773355345633405, DateAjout: new Date(), longitude: 4.881407027340321, Categorie: "securite"});
  // marqueurDeMort.save();
  // let marqueurDeMort = new Marqueur({codeTroncon:"T25237", latitude: 45.782554, DateAjout: new Date(), longitude: 4.87414299999999, Categorie: "securite"});
  // marqueurDeMort.save();
  let AllMarqueurs = await Marqueur.find({
    'codeTroncon': { '$in': listeCodeTroncon }
  }, { codeTroncon: 1, Categorie: 1, latitude: 1, longitude: 1});
  return AllMarqueurs;
}

module.exports = {
  addMarqueurTroncon,
  getallMarqueurById
};
