//Require the necessary modules

const express = require('express');
const app = express();
const credentials = require('./credentials');
const mongoose = require('mongoose');
const path = require('path');
const settings = require('./settings');

var mongooseOptions = {
    server: {
        socketOptions: {
            keepALive: 1
        }
    }
};

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
settings.config(app);
settings.setRoutes(app);
switch(app.get('env')) {
    case 'development': 
        mongoose.connect(credentials.mongo.dev, mongooseOptions);
        mongoose.connection.on('open', () => {
            
            //Log uri  for mongoose connection

            console.log(credentials.mongo.dev);
        });
        break;
    case 'production': 
        mongoose.connect(credentials.mongo.prod, mongooseOptions);
        mongoose.connection.on('open', () => {

            //Log uri for mongoose connection

            console.log(credentials.mongo.prod);
        });
        break;
}

app.listen(app.get('port'), () => {
    
    //Check if server is running and get environment

    console.log('Server listening on port %d, on %s environment', app.get('port'), app.get('env'));
});
