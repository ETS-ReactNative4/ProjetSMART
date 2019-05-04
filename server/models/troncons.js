const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Longueur: String,
    NoeudDepart: String,
    NoeudArrivee: String,
    Coordonnes: [{
                type: String
    }]
});

//Pour le nom de la table : Par défaut la première lettre est en minuscule et un s est ajouté à la fin
const Troncon = mongoose.model('Troncon', schema, 'troncons');

module.exports = {
    Troncon
}
