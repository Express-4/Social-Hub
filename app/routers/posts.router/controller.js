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

        post.createdOn = Date.now();

        return Promise
            .all([
                this.data.posts.create(post),
                this.data.users.findById(user._id),
            ])
            .then(([dbPost, dbUser]) => {
                dbUser.posts = dbUser.posts || [];
                dbUser.posts.push({
                    text: dbPost.text,
                    createdOn: dbPost.createdOn,
                });

                return Promise.resolve(this.data.users.updateById(dbUser));
            })
            .then(() => {
                // connect-flash
                return res.redirect('/profile/' + user.username);
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
