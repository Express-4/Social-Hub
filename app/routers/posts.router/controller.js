class PostsController {
    constructor(data) {
        this.data = data;
    }

    create(req, res) {
        const post = req.body;
        const user = req.user;

        post.user = {
            id: user._id,
            username: user.username,
        };

        post.createdOn = Date.now;

        return Promise
            .all([
                this.data.posts.create(post),
                this.data.users.findOrCreateBy(user.id),
            ])
            .then(([dbPost, dbUser]) => {
                user.posts = dbUser.posts || [];
                user.posts.push(dbPost);

                return Promise.all([
                this.data.posts.updateById(dbPost),
                this.data.users.updateById(dbUser),
                ]);
            })
            .then(() => {
                // connect-flash
                return res.redirect('/');
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/');
            });
    }
}

const init = (data) => {
    return new PostsController(data);
};

module.exports = { init };
