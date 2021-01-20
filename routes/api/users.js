const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
  
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route GET api/users
// @desc user list
// @access Public
router.get("/", (req, res) => {
    User.find({}).then(users => {
        res.json(users)
    }).catch(err=>console.log(err))
});

// @route GET api/users/update/:id
// @desc get user
// @access Public
router.post("/update/:id", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email
    let password = req.body.password
    const name = req.body.name
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            password = hash;
            User.findByIdAndUpdate(req.params.id,{
                email,
                password,
                name
            }).then((user) => { 
                res.json({
                    email:user.email,
                    name:user.name
                })
            }).catch(err=>console.log(err))
        });
    });
    
});

// @route GET api/users/:id
// @desc get user
// @access Public
router.get("/:id", (req, res) => {
    User.findById(req.params.id).then((user) => {
        res.json({
            email:user.email,
            name:user.name
        })
    }).catch(err=>console.log(err))
});

// @route GET api/users/delete/:id
// @desc delete user
// @access Public
router.delete("/delete/:id", (req, res) => {
    User.deleteOne({_id:req.params.id}).then(() => {
        res.json('User deleted')
    }).catch(err=>console.log(err))
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const email = req.body.email;
    const password = req.body.password;
    
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
    
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
                id: user.id,
                name: user.name
            };
                // Sign token
                jwt.sign( payload, keys.secretOrKey, {
                        expiresIn: 31556926 // 1 year in seconds
                }, (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            } else {
                return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});

/* GET Google Authentication API. */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", session: false }), function(req, res) {
    jwt.sign( req.user, keys.secretOrKey, {
        expiresIn: 31556926 // 1 year in seconds
    }, (err, token) => {
        res.redirect("http://localhost:3000?token=" + "Bearer " + token);
    });
});

/* GET Facebook Authentication API */
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
    // Successful authentication, redirect home.
    jwt.sign( req.user, keys.secretOrKey, {
        expiresIn: 31556926 // 1 year in seconds
    }, (err, token) => {
        res.redirect("http://localhost:3000?token=" + "Bearer " + token);
    });
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    jwt.sign( req.user, keys.secretOrKey, {
        expiresIn: 31556926 // 1 year in seconds
    }, (err, token) => {
        res.redirect("http://localhost:3000?token=" + "Bearer " + token);
    });
});

module.exports = router;
