class FriendRequest {
    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new FriendRequest();

        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = FriendRequest;
