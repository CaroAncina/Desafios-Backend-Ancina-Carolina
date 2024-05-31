import { Router } from 'express';
import bcrypt from 'bcrypt';
import userModel from '../../dao/models/users.model.js';

const router = Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.user = {
                first_name: 'Admin',
                last_name: 'Coder',
                email: 'adminCoder@coder.com',
                role: 'admin'
            };
            return res.redirect('/products');
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).redirect('/register');
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).render('login', { error: 'Credenciales incorrectas' });
        }

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        };

        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).render('login', { error: 'Error interno del servidor' });
    }
});

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role: 'user'
        });

        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).render('register', { error: 'Error interno del servidor' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).render('profile', { error: 'Error al cerrar sesión' });
        }
        res.redirect('/login');
    });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).render('profile', { error: 'Error al cerrar sesión' });
        }
        res.redirect('/login');
    });
});


export default router;
