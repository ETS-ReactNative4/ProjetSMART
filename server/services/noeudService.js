const { Noeud } = require('../models/index');

async function getNoeudByCode(codeNoeud) {
  const NoeudByCode = await Noeud.find({name: codeNoeud});
  return NoeudByCode;
}

module.exports = {
  getNoeudByCode
};
