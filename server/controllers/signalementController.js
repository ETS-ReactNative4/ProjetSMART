const signalementService = require('../services/signalementService');

async function addSignalement(req, res){
    await signalementService.addSignalement(req.body.signalement);
    res.json();
}

module.exports = {
    addSignalement
}