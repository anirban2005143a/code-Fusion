export const isGoogleLogin = (req, res, next) => { 
    if (req.user) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}