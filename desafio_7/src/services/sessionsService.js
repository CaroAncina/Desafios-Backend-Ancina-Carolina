import passport from 'passport';
import UserService from '../services/usersService.js'

export default class SessionService {
    static async registerUser(req, res, next) {
        passport.authenticate('register', (err, user, info) => {
            if (err) {
                return res.status(500).json({ status: "error", error: err.message });
            }
            if (!user) {
                return res.status(400).json({ status: "error", error: info.message });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ status: "error", error: err.message });
                }
                res.status(200).json({ status: "success", user });
            });
        })(req, res, next);
    }

    static async loginUser(req, res, next) {
        passport.authenticate('login', (err, user, info) => {
            if (err) {
                return res.status(500).json({ status: "error", error: err.message });
            }
            if (!user) {
                return res.status(400).json({ status: "error", error: info.message });
            }
            req.logIn(user, (err) => {
                if (err) {
                    return res.status(500).json({ status: "error", error: err.message });
                }
                req.session.user = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    age: user.age,
                    cart: user.cart,
                    role: user.role
                };
                res.status(200).json({ status: "success", user: req.session.user });
            });
        })(req, res, next);
    }

    static async logoutUser(req, res) {
        req.session.destroy(err => {
            if (err) return res.status(500).json({ status: "error", error: 'Error al cerrar sesión' });
            res.status(200).json({ status: "success", message: 'Sesión cerrada exitosamente' });
        });
    }

    static async githubAuth(req, res, next) {
        passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
    }

    static async githubCallback(req, res, next) {
        passport.authenticate('github', { failureRedirect: '/login' })(req, res, next);
    }

    static async setSessionUser(req, res) {
        req.session.user = req.user;
        res.redirect('/');
    }
}
