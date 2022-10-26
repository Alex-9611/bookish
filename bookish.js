import express from "express";
// import {Client} from "pg";
import pkg from 'pg';
const {Client} = pkg;

const client = new Client({
    user: "bookish",
    host: "localhost",
    database: "bookish",
    password: "!Tiffinschool1",
    port: 5432
});
client.connect();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    // send a query
    const books = queryForBooks();
    res.send(books);
    // turn into a list Books (the class)

    // then return
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

class Book {
    constructor(title, author, isbn) {
        (this.title = title), (this.author = author), (this.isbn = isbn);
    }
}

async function queryForBooks() {
    const books = await client.query('SELECT * FROM public.books');
    console.log(books);
}