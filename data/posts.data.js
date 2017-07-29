const BaseData = require('./base/base.data');
const Post = require('../models/post.model');

class PostsData extends BaseData {
    constructor(db) {
        super(db, Post, Post);
    }
}

module.exports = PostsData;
