const router = require("express").Router();
const passport = require("passport");
var Twitter = require('twitter');
const keys = require("../config/keys");
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";


var client = new Twitter({
  consumer_key: keys.TWITTER_CONSUMER_KEY,
  consumer_secret: keys.TWITTER_CONSUMER_SECRET,
  access_token_key: keys.TWITTER_ACCESS_TOKEN,
  access_token_secret: keys.TWITTER_TOKEN_SECRET
});

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
router.get(
  "/twitter/return",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);

router.get("/mytweetandemotion", (req, res) => {
  if (req.user) {
    var params = {screen_name: req.user.screenName, count: 1};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        const toneAnalyzer = new ToneAnalyzerV3({
          version: '2017-09-21',
          authenticator: new IamAuthenticator({
            apikey: keys.WATSON_API_KEY,
          }),
          serviceUrl: keys.WATSON_URL,
        });
        
        const toneParams = {
          toneInput: { 'text': tweets[0].text },
          contentType: 'application/json',
        };

        toneAnalyzer.tone(toneParams)
          .then(toneAnalysis => {
            const tones = toneAnalysis.result.document_tone.tones
            let emotion
            if (tones === undefined || tones.length == 0) {
              emotion = "no emotion"
            } else {
              emotion = tones[0].tone_id
            }

            res.json({
              success: true,
              message: "user has successfully retrieved latest tweet and its corresponding emotion",
              tweet: tweets[0].text,
              emotion: emotion
            });
          })
          .catch(err => {
            console.log('error:', err);
          });
      }
    });
  }
})

module.exports = router;