const express = require('express');
const routes = require('./routes/index');
const app = express();
const mongoose = require('mongoose');
const db = require('./utils/db');
const WEB_CONFIG = require('./config/web'); 

//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
/* 
app.use(express.static(path.join(__dirname, 'dist/RepriseOrdi')));
app.use('/', express.static(path.join(__dirname, 'dist/RepriseOrdi')));
*/
app.use('/api', routes);

const server = require('http')
    .createServer(app);

server.listen(WEB_CONFIG.port, WEB_CONFIG.hostname);
