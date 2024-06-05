import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import GitHubStrategy from 'passport-github2';
import userService from '../dao/models/users.model.js';
import { createHash, isValidPassword } from "../utils.js";

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, email, password, done) => {
            try {
                const { first_name, last_name, age } = req.body;
                let user = await userService.findOne({ email: email });
                if (user) {
                    return done(null, false, { message: 'No existe el usuario' });
                }
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email,
                    password: createHash(password)
                };
                let result = await userService.create(newUser);
                return done(null, result);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                let user = await userService.findOne({ email });
                if (!user) {
                    return done(null, false, { message: 'Usuario no encontrado' });
                }
                if (!isValidPassword(user, password)) {
                    return done(null, false, { message: 'Usuario y/o Contraseña incorrecta' });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('github', new GitHubStrategy({
        clientID: "yourClientID",
        clientSecret: "yourClientSecret",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await userService.findOne({ email: profile._json.email });
            if (!user) {
                let newUser = {
                    first_name: profile._json.name || profile.username,
                    last_name: "",
                    age: 20,
                    email: profile._json.email || `${profile.username}@github.com`,
                    password: ""
                };
                let result = await userService.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userService.findById(id);
        done(null, user);
    });
}

export default initializePassport;