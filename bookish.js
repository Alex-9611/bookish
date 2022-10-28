import express from "express";
import bodyParser from "body-parser";
import { queryForBookList, authenticateLoginInfo } from "./bookishQueries.js";
import jwt from "jsonwebtoken";
import { exportedJWTStrat } from "./passport.js";
import BookRoutes from './BookController.js';

import passport from "passport";
import passportJWT from "passport-jwt";

passport.use(exportedJWTStrat);

const app = express();
const port = 3000;

//this.express.use('/books', BookRoutes);

app.use('/books', BookRoutes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("frontend"));

app.get("/books", passport.authenticate("jwt", { session: false }), async (req, res) => {
    queryForBookList().then((bookList) => {
        res.send(bookList);
    });
});

app.post("/login", (req, res) => {
    console.log("POST request received at /login");

    authenticateLoginInfo(req.body.username, req.body.password).then((authenticationStatus) => {
        if (authenticationStatus === true) {
            const token = jwt.sign({ username: req.body.username, password: req.body.password }, "secret");
            res.send(token);
        } else {
            res.send("invalid username and/or password");
        }
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
