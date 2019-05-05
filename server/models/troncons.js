const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    NoeudDepart: String,
    NoeudArrivee: String,
    Longueur: Number,
    coordonnees: [Schema.Types.Mixed],
    commune: String,
    rue: String,
    codefuv: String,
    cyclable: String,
    matiereDangereuse: String,
    revetTrottoir1: String,
    largeurTrottoir1: String,
    revetTrottoir2: String,
    largeurTrottoir2: String,
});

//Pour le nom de la table : Par défaut la première lettre est en minuscule et un s est ajouté à la fin
const Troncon = mongoose.model('Troncon', schema, 'troncons');

module.exports = {
    Troncon
}
