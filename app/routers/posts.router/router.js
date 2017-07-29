const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .post('/', (req, res) => {
            if (!req.user) {
                return Promise.resolve()
                    .then(() => {
                        res.redirect('/auth/sign-in');
                    });
            }

            return controller.create(req, res);
        });

    app.use('/posts', router);
};

module.exports = { attachTo };
