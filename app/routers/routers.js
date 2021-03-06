/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        if (!req.user) {
                return Promise.resolve()
                    .then(() => {
                        res.render('homeUnloged');
                    });
            }

        return res.render('home');
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });

    app.get('*', (req, res) => {
        return res.render('404');
    });
};

module.exports = { attachTo };

