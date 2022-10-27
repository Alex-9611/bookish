import express from "express";
import { queryForBooks } from "./bookishQueries.js";
import jwt from "jsonwebtoken";
import path from "path";

const app = express();
const port = 3000;

// app.use(express.static('frontend'));

app.get("/", (req, res) => {
    const books = queryForBooks().then((output) => {
        res.send(output);
    });

    // turn into a list Books (the class)

    // then return
});
app.get("/loginPage", (req, res) => {
    res.sendFile('/Work/Bootcamp/bookish' + '/frontend/index.html');
    // request username and passaword
    // provide and return a jwt
    const token = jwt.sign({username : '_'}, 'secret');
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
