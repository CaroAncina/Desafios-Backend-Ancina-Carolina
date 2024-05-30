export const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.role === 'admin' && req.path !== '/profile') {
            return res.redirect('/profile');
        }
        return next();
    }
    res.redirect('/login');
};

export const isNotAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    res.redirect('/products');
};
