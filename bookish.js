import express from "express";
import bodyParser from "body-parser";
import { queryForBookList, authenticateLoginInfo } from "./bookishQueries.js";
import jwt from "jsonwebtoken";
import JwtStrategy from "passport-jwt";
import ExtractJwt from "passport-jwt"


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('frontend'));


app.get("/", (req, res) => {
    queryForBookList().then((bookList) => {
        res.send(bookList);
    });
});


app.get('/login', (req, res) => {
    
})

app.post("/authentication", (req, res) => {
    console.log('POST request received at /authentication');
    console.log(req.body.username)
    console.log(req.body.password)
    authenticateLoginInfo(req.body.username, req.body.password)
    .then((authenticationStatus) => {
        if (authenticationStatus === true) {
            console.log('true')
            const token = jwt.sign({ username: req.body.username, password: req.body.password }, "secret");
            console.log(token)
            res.send(token);
        } else {
            res.send("invalid username and/or password");
        }
    })
})
    
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
