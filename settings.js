const hbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const MemoryStore = session.MemoryStore;
const cookie = require('cookie-parser');
const credentials = require('./credentials');
const mongoose = require('mongoose');
const moment = require('moment');


module.exports = {
    config: (app) => {
        app.engine('hbs', hbs({
            defaultLayout: 'header',
            layoutsDir: path.resolve(app.get('views')+'/layouts'),
            extname: '.hbs',
            helpers: {
                timefunc: (time) => {
                    return moment(time).startOf('minute').fromNow();
                }
            }
        }));
        app.set('view engine', 'hbs');
        app.use(cookie());
        app.use(session({
            secret: credentials.session.init.secret,
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