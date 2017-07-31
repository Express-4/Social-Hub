const BaseData = require('./base/base.data');
const FriendRequest = require('../models/friend.request.model');

class FriendRequestData extends BaseData {
    constructor(db) {
        super(db, FriendRequest, FriendRequest);
    }
}

module.exports = FriendRequestData;
