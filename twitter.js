
var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
var User = require('./models/account');

passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
passport.use(new TwitterStrategy({
        'consumerKey'       : 'gm6rg1Z11mBPUDFHhYMz8SB3L',
        'consumerSecret'    : 'Uk38DjvT4Ct7eodVVOlK1dyopg2X1Dyd7MsXcxLSJyGMIigVHd',
        //'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
        //'callbackURL'       : 'http://127.0.0.1:3000/auth/twitter/callback'
        'callbackURL'       :  'https://reddit3-reddytej.c9users.io/twitter/callback',
        'passReqToCallback' : 'true'
  },
  function(req, token, tokenSecret, profile, done) {
        
        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {
                
                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
                    
                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.twitter.token) {
                            user.twitter.token = token;
                            user.twitter.username = profile.username;
                            user.twitter.displayName = profile.displayName;
                            req.body.username = user.twitter.displayName
                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser = new User();

                        newUser.twitter.id = profile.id;
                        newUser.twitter.token = token;
                        newUser.twitter.username = profile.username;
                        newUser.twitter.displayName = profile.displayName;
                        req.body.username = newUser.twitter.displayName
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
    
            } else {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session

                user.twitter.id = profile.id;
                user.twitter.token = token;
                user.twitter.username = profile.username;
                user.twitter.displayName = profile.displayName;
                req.body.username = user.twitter.displayName
                
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
            
        });

    }));



module.exports = passport;

