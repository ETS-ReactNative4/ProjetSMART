async function fillDataBase() {

    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['server/pythonCode/test.py']);

    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
    });
};

module.exports = {
    fillDataBase,
}