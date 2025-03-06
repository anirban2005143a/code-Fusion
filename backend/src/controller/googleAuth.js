import passport from "passport";

const googleLogin = async (req, res) => {
    console.log("dcndbw")
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    });
}

const googleLoginCallback = async (req, res) => {
    passport.authenticate('google',
        {   
            successRedirect : '/auth/google/success',
            failureRedirect:  '/auth/google/failure' 
        }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        }
}

const googleSuccess = async (req, res) => {
    const name = req.user.displayName
    res.send("hello " + name + " you are successfully logged in");
}

const googleFailure = async (req, res) => {
    res.send("Google Login Failure");
}

export {
    googleLogin,
    googleLoginCallback,
    googleSuccess,
    googleFailure
};