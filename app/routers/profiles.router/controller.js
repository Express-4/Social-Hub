const userModel = require('../../../models/user.model');
const path = require('path');
const Jimp = require('jimp');

class ProfileController {
    constructor(data) {
        this.data = data;
    }

    sendRequest(req, res) {
        const toUsername = req.params.to;
        const fromUsername = req.user.username;

        return Promise.all([
            this.data.users.findByUsername(toUsername),
            this.data.users.findByUsername(fromUsername),
        ])
        .then(([toUser, fromUser]) => {
            const request = {
                to: {
                     _id: toUser._id,
                     username: toUser.username,
                },
                from: {
                    id: fromUser._id,
                    username: fromUser.username,
                },
            };
            toUser.receivedRequests = toUser.receivedRequests || [];
            fromUser.sentRequests = fromUser.sentRequests || [];

            toUser.receivedRequests.push(request);
            fromUser.sentRequests.push(request);

            return Promise.all([
                this.data.requests.create(request),
                this.data.users.updateById(toUser),
                this.data.users.updateById(fromUser),
            ])
            .then(([dbReqest, dbToUser, dbFromUser]) => {
                const url = '/profile/' + dbToUser.username;
                res.redirect(url);
            });
        })
        .catch((err) => {
            res.redirect('/404');
        });
    }

    getProfile(req, res) {
        const username = req.params.username;
        this.data.users.findByUsername(username)
            .then((user) => {
                const viewModel = userModel.toViewModel(user);
                if(viewModel.posts){
                    viewModel.posts.sort((a, b) => {
                        return new Date(b.createdOn) - new Date(a.createdOn);
                    });
                }

                res.render('profiles/profile', { context: viewModel });
            })
            .catch((err) => {
                res.render('404');
            });
    }

    getSearchedProfile(req, res) {
        const username = req.params.username;
        this.data.users.findByUsername(username)
            .then((user) => {
                const viewModel = userModel.toViewModel(user);
                viewModel.posts.sort((a, b) => {
                    return new Date(b.createdOn) - new Date(a.createdOn);
                });

                res.render('profiles/searchProfile', { context: viewModel });
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
                user.avatarPath = '/static/avatars/' + fileName;
                this.data.users.updateById(user);
                res.json({ success: true, avatarFileLocation: pathToSave });
            });
    }
}

const init = (data) => {
    return new ProfileController(data);
};

module.exports = { init };
