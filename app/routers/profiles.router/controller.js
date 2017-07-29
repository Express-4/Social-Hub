const userModel = require('../../../models/user.model');

class ProfileController {
    constructor(data) {
        this.data = data;
    }

    getProfile(req, res) {
        const username = req.params.username;
        this.data.users.findByUsername(username)
            .then((user) => {
                const viewModel = userModel.toViewModel(user);
                res.render('profiles/profile', { context: viewModel });
            })
            .catch((err) => {
                res.render('404');
            });
    }
}

const init = (data) => {
    return new ProfileController(data);
};

module.exports = { init };
