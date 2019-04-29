const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BranDB')
    .then(()=> console.log("conenction successful"))
    .catch((err) => console.error(err));
