const routeService = require('../controllers/routeController');
async function fillDataBase() {

    const { spawn } = require('child_process');
    const liste = routeService.getAllRoutesWithPenalties();
    const pyProg = spawn('python', ['server/pythonCode/test.py', liste]);

    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
    });
};

module.exports = {
    fillDataBase,
}
