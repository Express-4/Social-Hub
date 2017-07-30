const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.items.getAll()
                .then((items) => {
                    return res.render('items/all', {
                        context: items,
                    });
                });
        },
        getChat(req, res) {
            res.render('items/chat', { name: req.user });
            //res.sendFile(__dirname + '../../../views/index.html');
        },
        getProfile(req, res) {
            res.render('items/profile');
        },
    };

    return controller;
};


module.exports = { init };
