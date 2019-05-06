const routeService = require('../controllers/routeController');

const fillDataBase = (liste) => {
  return new Promise((res, err) => {
    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['server/pythonCode/Dijkstra.py', JSON.stringify(liste)]);
    pyProg.stdout.on('data', function(data) {
        res(data.toString());
    });
  })
};

module.exports = {
    fillDataBase,
}
