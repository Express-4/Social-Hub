const { Router } = require('express');
const path = require('path');
const multer = require('multer');

let fileName;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../static/temp/'));
    },
    filename: (req, file, cb) => {
        fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/:username', (req, res) => {
            if (!req.user) {
                return Promise.resolve()
                    .then(() => {
                        res.redirect('/auth/sign-in');
                    });
            }

            return controller.getProfile(req, res);
        })
        .get('/change/avatar', (req, res) => {
            if (!req.user) {
                return Promise.resolve()
                    .then(() => {
                        res.redirect('/auth/sign-in');
                    });
            }

            return controller.getChangeAvatar(req, res);
        })
        .post('/change/avatar', upload.single('file'), (req, res) => {
            if (req.file) {
                res.json({
                    success: true,
                    fileName: '/static/temp/' + fileName,
                });
            }
        })
        .post('/avatar/save', (req, res) => {
            return controller.saveChangedAvatar(req, res);
        })
        .get('/sendrequest/:to/:from', (req, res) => {
            
        });

    app.use('/profile', router);
};

module.exports = { attachTo };
