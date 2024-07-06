const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const verifyToken = require('./authMiddleware');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.session());
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cors());

//Do zapisywania danych logowania OAuth2 po stronie serwera na 5.0
let users = [];

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails[0].value;
            console.log(`${email} just logged in!`)
            //Wymaganie na 5.0
            if (!users[profile.id]) {
                users[profile.id] = {
                    googleId: profile.id,
                    email: email,
                    name: profile.displayName,
                    accessToken: accessToken,
                };
            }
            console.log(users[profile.id]);
            done(null, users[profile.id]);
        } catch (err) {
            done(err, null);
        }
    }
));

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const login = profile.username;
            console.log(`${login} just logged in via GitHub!`);

            //Wymaganie na 5.0
            if (!users[profile.id]) {
                users[profile.id] = {
                    githubId: profile.id,
                    login: login,
                    accessToken: accessToken,
                };
            }
            done(null, users[profile.id]);
        } catch (err) {
            console.error(err);
            done(err, null);
        }
    }
));

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({id: Date.now(), name, email, password: hashedPassword});
    res.status(201).json({message: 'User registered successfully'});
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const token = jwt.sign({id: user.id}, 'secret', {expiresIn: '1h'});
    res.status(200).json({message: 'Login successful', token});
});

app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/auth/github',
    passport.authenticate('github', {scope: ['profile', 'email']}));

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: 'http://localhost:3000/login'}),
    (req, res) => {
        const payload = {
            id: req.user.googleId,
            email: req.user.email,
            name: req.user.displayName
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        users[payload.id].JWTtoken = token;
        console.log(users[payload.id]);
        res.redirect(`http://localhost:3000/login?token=${token}`);
    }
);

app.get('/auth/github/callback',
    passport.authenticate('github', {failureRedirect: 'http://localhost:3000/login'}),
    (req, res) => {
        const payload = {
            id: req.user.githubId,
            email: req.user.email,
            name: req.user.displayName
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        users[payload.id].JWTtoken = token;
        console.log(users[payload.id]);
        res.redirect(`http://localhost:3000/login?token=${token}`);
    }
);
app.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({message: 'Cześć!'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
