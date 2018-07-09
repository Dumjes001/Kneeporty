const router = require('./controllers/router');

module.exports.init = (app) => {
    app.get('/', router.index);
}