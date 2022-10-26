import express from "express";
import { queryForBooks } from "./bookishQueries.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const books = queryForBooks().then((output) => {
        res.send(output);
    });

    // turn into a list Books (the class)

    // then return
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
