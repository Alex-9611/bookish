import jwt from "jsonwebtoken";
import passport from "passport";
import passportJWT from "passport-jwt";
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter("encryptedKey");
opts.secretOrKey = "secret";
export const exportedJWTStrat = new JwtStrategy(opts, function (jwt_payload, done) {
    return done(null, true);
});
