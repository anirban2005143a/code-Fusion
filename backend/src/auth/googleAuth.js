import { Router } from "express";
import {
    googleLogin,
    googleLoginCallback,
    googleSuccess,
    googleFailure
} from "../controller/googleAuth.js";

import { isGoogleLogin } from "../middleware/isGoogleLogin.js";

// console.log("aaya hu routes ");
const googleAuthentication = Router();
googleAuthentication.route("/google").get(googleLogin);
googleAuthentication.route("/google/success").get(isGoogleLogin , googleSuccess);
googleAuthentication.route("/google/failure").get(googleFailure);
googleAuthentication.route("/google/callback").get(googleLoginCallback);

export default googleAuthentication;
