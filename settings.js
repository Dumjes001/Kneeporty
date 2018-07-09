const hbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const MemoryStore = session.MemoryStore;
const cookie = require('cookie-parser');
const credentials = require('./credentials');
const mongoose = require('mongoose');
const moment = require('moment');
const morgan = require('morgan');
const logger = require('express-logger');
const routes = require('./routes');


module.exports = {
    config: (app) => {
        app.engine('hbs', hbs({
            defaultLayout: 'main',
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
        }));

        switch(app.get('env')) {
            case 'development':
                app.use(morgan('dev'))
                break;
            case 'production':
                app.use(logger({
                    path: path.join(__dirname, '/logs')
                }))
        }
        console.log('App configured');
    },
    setRoutes: (app) => {
        routes.init(app);
    }
}