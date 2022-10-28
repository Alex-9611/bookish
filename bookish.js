import express from "express";
import bodyParser from "body-parser";
import { queryForBookList, authenticateLoginInfo } from "./bookishQueries.js";
import jwt from "jsonwebtoken";
import { exportedJWTStrat } from "./passport.js";

import passport from "passport";
import passportJWT from "passport-jwt";


passport.use(exportedJWTStrat)

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("frontend"));

app.get("/books", passport.authenticate("jwt", { session: false }), (req, res) => {
    console.log("username : " + req.body.username);
    console.log("password : " + req.body.password);
    if (authenticateLoginInfo(req.body.username, req.body.password)) {
        queryForBookList().then((bookList) => {
            res.send(bookList);
        });
    } else {
        res.send('Please login with a valid username and password')
    }
});

app.post("/login", (req, res) => {
    console.log("POST request received at /login");

    authenticateLoginInfo(req.body.username, req.body.password)
    .then((authenticationStatus) => {
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
