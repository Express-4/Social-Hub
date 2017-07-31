const CategoriesData = require('./categories.data');
const UsersData = require('./users.data');
const PostsData = require('./posts.data');

const init = (db) => {
    return Promise.resolve({
        categories: new CategoriesData(db),
        users: new UsersData(db),
        posts: new PostsData(db),
    });
};

module.exports = { init };
