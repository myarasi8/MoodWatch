const passport = require('passport')
// const Strategy = require('passport-twitter').Strategy
const Strategy = require('passport-twitter')
const keys = require("./keys");
const User = require("../models/user-model");

passport.serializeUser(function(user, callback) {
    callback(null, user)
  })
  
passport.deserializeUser(function(obj, callback) {
    callback(null, obj)
})

passport.use(
    new Strategy(
        {
            consumerKey: keys.TWITTER_CONSUMER_KEY,
            consumerSecret: keys.TWITTER_CONSUMER_SECRET,
            callbackURL: '/auth/twitter/return'
        },
        async (token, tokenSecret, profile, done) => {
            // find current user in UserModel
            const currentUser = await User.findOne({
                twitterId: profile._json.id_str
            });
            // create new user if the database doesn't have this user
            if (!currentUser) {
                const newUser = await new User({
                    name: profile._json.name,
                    screenName: profile._json.screen_name,
                    twitterId: profile._json.id_str,
                    profileImageUrl: profile._json.profile_image_url
                }).save();
                if (newUser) {
                    done(null, newUser);
                }
            }
            done(null, currentUser);
        }
    )
)