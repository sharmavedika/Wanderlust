const User = require("../models/user");
const passport = require("passport");

// ✅ Signup
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);

            res.status(201).json({
                message: "Welcome to Wanderlust!",
                user: {
                    _id: registeredUser._id,
                    username: registeredUser.username,
                    email: registeredUser.email,
                }
            });
        });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// ✅ Login
module.exports.login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password!" });
        }

        req.login(user, (err) => {
            if (err) return next(err);

            res.status(200).json({
                message: "Welcome back to WanderLust!",
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                }
            });
        });
    })(req, res, next);
};

// ✅ Logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        res.status(200).json({ message: "You are logged out!" });
    });
};

// ✅ Get current logged in user
module.exports.getCurrentUser = (req, res) => {
    if (req.user) {
        res.status(200).json({
            user: {
                _id: req.user._id,
                username: req.user.username,
                email: req.user.email,
            }
        });
    } else {
        res.status(401).json({ error: "Not logged in!" });
    }
};