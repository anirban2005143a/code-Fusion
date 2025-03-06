const passport = require("passport");
require("dotenv").config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    passReqToCallback: true
},
    function (accessToken, refreshToken, profile, cb) {

        /* this part is finding user who just login with google account in the database 
       
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return cb(err, user);
        // });
        
        */

        cb(null , profile);

    }
));

passport.serializeUser((user , cb)=>{
    cd(null , user);
})

passport.deserializeUser((user , cb)=>{
    cb(null , user);
})