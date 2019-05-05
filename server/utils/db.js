const mongoose = require('mongoose');
const { credentialsMongo } = require('../secret/mongoDBCredentials');

const uri = "mongodb+srv://" + credentialsMongo.user + ":" + credentialsMongo.mdp + "@cluster0-q0yl2.azure.mongodb.net/test?retryWrites=true";
// 'mongodb://localhost/BranDB'
console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true })
    .then(()=> console.log("conenction successful"))
    .catch((err) => console.error(err));
