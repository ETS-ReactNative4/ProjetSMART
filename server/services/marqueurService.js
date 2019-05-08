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
  const AllMarqueurs = await Marqueur.find({
    'codeTroncon': { $in: listeCodeTroncon }
  });
  return AllMarqueurs;
}

module.exports = {
  addMarqueurTroncon,
  getallMarqueurById
};
