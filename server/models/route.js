const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const schema = new Schema({
    nom: String,
    lat: Number,
    lon : Number,
});

//Pour le nom de la table : Par défaut la première lettre est en minuscule et un s est ajouté à la fin
const Route = mongoose.model('Route', schema, 'routes');

module.exports = {
    Route
}