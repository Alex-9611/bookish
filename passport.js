import jwt from "jsonwebtoken";
import passport from "passport";
import passportJWT from "passport-jwt";
import { authenticateLoginInfo } from "./bookishQueries.js";
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter("encryptedKey");
opts.secretOrKey = "secret";

export const exportedJWTStrat = new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = jwt_payload;
    if (await authenticateLoginInfo(user.username, user.password)) {
        return done(null, user);
    } else {
        return done(null, false);
    }
});
