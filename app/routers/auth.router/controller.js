class TodosController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up');
    }
    getSignInForm(req, res) {
        return res.render('auth/sign-in');
    }
    signOut(req, res) {
        req.session.destroy(function(err) {
        res.redirect('/');
    });
    }

    signUp(req, res) {
        const bodyUser = req.body;
        req.check('username', 'Username is required').notEmpty();
        req.check('email', 'Email is required').notEmpty();
        req.check('email', 'Email is not valid').isEmail();
        req.check('password', 'Password is required').notEmpty();
        req.check('password', 'Password must be at least 4 characters')
            .isLength({ min: 4 });
        req.check('password', 'Passwords do not match')
            .equals(req.body.confirmpassword);
        const errors = req.validationErrors();
        if (errors) {
            const errorsModel = { errors: errors };
            res.render('auth/sign-up', errorsModel);
            return;
        }

        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }
                return this.data.users.create(bodyUser);
            })
            .then((dbUser) => {
                return res.redirect('/auth/sign-in');
            })
            .catch((err) => {
                res.render('auth/sign-up', { errors: [{ msg: err.message }] });
            });
    }
}

const init = (data) => {
    return new TodosController(data);
};

module.exports = { init };
