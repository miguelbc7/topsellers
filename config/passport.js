const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
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

    passport.use(new FacebookStrategy({
        clientID: "1725784724260713",
        clientSecret: "a7bbcb4501e30259c7c23425de8b54e6",
        callbackURL: "http://localhost:5000/api/users/facebook/callback",
        enableProof: true
    }, function(accessToken, refreshToken, profile, done) {
        console.log('profile', profile);
        var userData = {
            name: profile.displayName,
            token: accessToken
        };
        
        done(null, userData);
    }));

    /* passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
    }, function(token, tokenSecret, profile, cb) {
        User.findOrCreate({ twitterId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    })); */

    passport.use(new GitHubStrategy({
        clientID: "105fbf4afe9fcdd81156",
        clientSecret: "f3f066480d7c6fea940613d880fd74c78407c4b1",
        callbackURL: "http://localhost:5000/api/users/github/callback"
    }, function(accessToken, refreshToken, profile, done) {
        var userData = {
            name: profile.displayName,
            token: accessToken
        };
        
        done(null, userData);
    }));
};