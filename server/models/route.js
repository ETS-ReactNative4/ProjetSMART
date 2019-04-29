const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const schema = new Schema({
    nom: String,
    lat: Number,
    lon : Number,
});
 
const Route = mongoose.model('Route', schema);

module.exports = {
    Route
}