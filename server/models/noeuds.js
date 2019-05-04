const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    latitude: String,
    longitude : String,
});

//Pour le nom de la table : Par défaut la première lettre est en minuscule et un s est ajouté à la fin
const Noeud = mongoose.model('Noeud', schema, 'noeuds');

module.exports = {
    Noeud
}
