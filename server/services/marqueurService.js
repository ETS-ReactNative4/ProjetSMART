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

async function getMarqueurById(unCodeTroncon) {
  const allTroncons = await Troncon.find({codeTroncon : unCodeTroncon });
  return allTroncons;
}

module.exports = {
  addMarqueurTroncon,
  getMarqueurById
};
