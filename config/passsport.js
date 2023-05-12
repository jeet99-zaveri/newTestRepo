const passport = require('passport');
const passportJWT = require('passport-jwt');

const extractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
        return UserModel.findOne({ email, password }).then(function (user) {
            if (user) {
                return cb(null, user, { message: "Login Successfully." });
            } else {
                return cb(null, false, { message: "Invalid Username or Password." });
            }
        }).catch(err => cb(err));
    }
));

passport.use(new JWTStrategy(
    { 
        jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    function (payload, cb) {
        return UserModel.findOne({_id: payload.id}).then(function (user) {
            if (user) {
                return cb(null, user);
            } else {
                return cb(null, false);
            }
        }).catch(err => cb(err));
    })
);