//Require the necessary modules

const express = require('express');
const app = express();
const credentials = require('./credentials');
const mongoose = require('mongoose');

app.set('port', process.env.PORT || 3000);

switch(app.get('env')) {
    case 'development': 
        mongoose.connect(credentials.mongo.dev);
        mongoose.connection.on('open', () => {
            
            //Log uri  for mongoose connection

            console.log(credentials.mongo.dev);
        });
        break;
    case 'production': 
        mongoose.connect(credentials.mongo.prod);
        mongoose.connection.on('open', () => {

            //Log uri for mongoose connection

            console.log(credentials.mongo.prod);
        });
        break;
}

app.listen(app.get('port'), () => {
    
    //Check if server is running and get environment

    console.log('Server listening on port '+app.get('port')+' on environment '+app.get('env'));
});