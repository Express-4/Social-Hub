const userModel = require('../../../models/user.model');
const path = require('path');
const Jimp = require('jimp');

class ProfileController {
    constructor(data) {
        this.data = data;
    }

    getProfile(req, res) {
        const username = req.params.username;
        this.data.users.findByUsername(username)
            .then((user) => {
                const viewModel = userModel.toViewModel(user);
                viewModel.posts.sort((a, b) => {
                    return new Date(b.createdOn) - new Date(a.createdOn);
                });

                res.render('profiles/profile', { context: viewModel });
            })
            .catch((err) => {
                res.render('404');
            });
    }

    getChangeAvatar(req, res) {
        res.render('profiles/upload-avatar');
    }

    saveChangedAvatar(req, res) {
        const fileName = req.body.fileName.replace(/^.*[\\\/]/, '');
        const left = req.body.l.replace('-', '').replace('px', '');
        const top = req.body.t.replace('-', '').replace('px', '');
        const w = req.body.w.replace('-', '').replace('px', '');
        const h = req.body.h.replace('-', '').replace('px', '');

        const topCor = parseInt(top, 10);
        const leftCor = parseInt(left, 10);
        const height = parseInt(h, 10);
        const realImagePath = path.join(__dirname, '../../../static/temp/' + fileName);
        const pathToSave = path.join(__dirname, '../../../static/avatars/' + fileName);

        Jimp.read(realImagePath)
            .then((image) => {
                image.crop(leftCor, topCor, height, height)
                    .write(pathToSave);
            })
            .then(() => {
                const user = req.user;
                user.avatarPath = pathToSave;
                this.data.users.updateById(user);
                res.json({ success: true, avatarFileLocation: pathToSave });
            });
    }
}

const init = (data) => {
    return new ProfileController(data);
};

module.exports = { init };
