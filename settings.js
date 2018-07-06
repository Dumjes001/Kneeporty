const hbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const MemoryStore = session.MemoryStore;
const cookie = require('cookie-parser');
const credentials = require('./credentials');
const mongoose = require('mongoose');


module.exports = {
    config: (app) => {
        app.engine('hbs', hbs({
            defaultLayout: 'main',
            layoutsDir: path.resolve(app.get('views')+'/layouts'),
            extname: '.hbs'
        }));
        app.set('view engine', 'hbs');
        app.use(cookie());
        app.use(session({
            cookie: credentials.session.init.cookie,
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                db: app.get('env') === 'development' ? 'kneeportytestdb' : ''
            })
        }))
    },
    setRoutes: (app) => {

    }
}