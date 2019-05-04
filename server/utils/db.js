const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/PldSMART', { useNewUrlParser: true })
    .then(()=> console.log("conenction successful"))
    .catch((err) => console.error(err));
