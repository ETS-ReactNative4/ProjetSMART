const { Troncon } = require('../models/index');
const dbMongoose = require('../utils/db');

async function getAllTroncons() {
  const allTroncons = await Troncon.find();
  return allTroncons;
}

async function getRouteByCityStreet(uneCommune,uneRue) {
  const routesCityStreet = await Troncon.find({commune: uneCommune,rue: uneRue});
  return routesCityStreet;
}

async function getTronconsbyId(IdTroncon) {
  const troncon = await Troncon.findOne({
    'codeTroncon': IdTroncon
  })
  return troncons;
}

async function updateTronconsProblems(query, modif, res){
  if (!!query.modif) {
    let nouvCompteur = query.modif + 1;
    Troncon.findOneAndUpdate({codeTroncon : query.codeTroncon}, {modif: nouvCompteur}, {upsert:true}, function(err, doc){
    if (err) return res.status(500).send({ error: err });
      return res.status(200).send("succesfully saved");
  });
  } else {
    Troncon.findOneAndUpdate({codeTroncon : query.codeTroncon}, {modif: 1}, {upsert:true}, function(err, doc){
      if (err) return res.status(500).send({ error: err });
      return res.status(200).send("succesfully saved");
  });
  }


}
async function getTronconsByNoeudDepartCityStreet(nameNoeud, uneCommune, uneRue) {
  const tronconNoeudDepart = await Troncon.find({commune: uneCommune, rue: uneRue, NoeudDepart : nameNoeud});
  return tronconNoeudDepart;
}

async function getTronconsByNoeudArriveeCityStreet(nameNoeud, uneCommune, uneRue) {
  const tronconNoeudArrivee = await Troncon.find({commune: uneCommune, rue: uneRue, NoeudArrivee : nameNoeud});
  return tronconNoeudArrivee;
}


module.exports = {
  getAllTroncons,
  getRouteByCityStreet,
  getTronconsbyId,
  getTronconsByNoeudDepartCityStreet,
  getTronconsByNoeudArriveeCityStreet,
  updateTronconsProblems
};
