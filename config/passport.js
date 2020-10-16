const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

const keys = require("../config/keys");
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use( new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then( (user) => {
            if (user) {
                return done(null, user);
            }
            
            return done(null, false);
        }).catch( (err) => { 
            console.log(err)
        });
    }));

    passport.use( new GoogleStrategy({
        clientID: "661208653835-a6e15mqoe591llg7o2l6qhtk4t8keqa1.apps.googleusercontent.com",
        clientSecret: "0VHwUl92hWTUv8D1JFZQKlC5",
        callbackURL: "http://localhost:5000/api/users/google/callback"
    }, function(accessToken, refreshToken, profile, done) {
        var userData = {
            email: profile.emails[0].value,
            name: profile.displayName,
            token: accessToken
        };
        
        done(null, userData);
    }));
};