const { Route } = require('../models/index');

async function getAllRoutes(){
    const test = await Route.find();
    console.log(test);
    return await Route.find({}).exec();
}

module.exports = {
    getAllRoutes
};