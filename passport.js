import passport from 'passport'
import passportJWT from 'passport-jwt'
const JwtStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter("encryptedKey");
opts.secretOrKey = "secret";
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.sub }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);
