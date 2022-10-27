import express from "express";
import { queryForBookList } from "./bookishQueries.js";
import jwt from "jsonwebtoken";
// import path from "path";
// import passport-jwt from "passport-jwt";

const app = express();
const port = 3000;


app.get("/", (req, res) => {
    queryForBookList().then((bookList) => {
        res.send(bookList);
    });
});
app.get("/loginPage", (req, res) => {
    res.sendFile('/Work/Bootcamp/bookish' + '/frontend/index.html')
    // record the entered username and password
        // create and return a jwt
        // presumably send them to the main 'website' armed with their jwt
    // provide and return a jwt
    const token = jwt.sign({username : 'username', password : 'password'}, 'secret');
    console.log(token);
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
