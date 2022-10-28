import express from "express";
import bodyParser from "body-parser";
import { queryForBookList, authenticateLoginInfo } from "./bookishQueries.js";
import jwt from "jsonwebtoken";

import passport from "passport";
import passportJWT from "passport-jwt";
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter("encryptedKey");
// opts.secretOrKeyProvider = secretOrKeyProvider(request, rawJwtToken, done);
opts.secretOrKey = "secret";
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
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

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("frontend"));

app.get("/books", passport.authenticate("jwt", { session: false }), (req, res) => {
    queryForBookList().then((bookList) => {
        res.send(bookList);
    });
});



app.post("/login", (req, res) => {
    console.log("POST request received at /login");

    authenticateLoginInfo(req.body.username, req.body.password).then((authenticationStatus) => {
        if (authenticationStatus === true) {
            console.log("true");
            const token = jwt.sign({ username: req.body.username, password: req.body.password }, "secret");
            console.log(token);
            res.send(token);
        } else {
            res.send("invalid username and/or password");
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
