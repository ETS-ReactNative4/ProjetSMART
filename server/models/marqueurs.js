const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Categorie: {
      type: String,
      enum: ['securite', 'etat', 'eclairage', 'interet', 'travaux', 'fermee'],
    },
    DateAjout: Date,
    codeTroncon : String,
    latitude : Number,
    longitude : Number,
});

//Pour le nom de la table : Par défaut la première lettre est en minuscule et un s est ajouté à la fin
const Marqueur = mongoose.model('Marqueur', schema, 'marqueurs');

module.exports = {
    Marqueur
}
