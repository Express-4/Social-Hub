/* eslint-disable no-console */

const async = () => {
    return Promise.resolve();
};

const config = require('./config');

async()
    .then(() => require('./db').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => require('./app/chat').init(app))
    .then((server) => {
        server.listen(config.port, () =>
            console.log(`Server listening at :${config.port}`));
    })
    .catch((err) => {
        console.log(err);
    });
