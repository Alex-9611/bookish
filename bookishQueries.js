import pkg from "pg";
const { Client } = pkg;
import { Book } from "./Book.js";


const client = new Client({
    user: "bookish",
    host: "localhost",
    database: "bookish",
    password: "!Tiffinschool1",
    port: 5432,
});
client.connect();

export async function queryForBookList() {
    const books = await client.query("SELECT * FROM public.books");
    const bookList = await constructBookList(books.rows);
    
    return bookList;
}
 async function constructBookList(bookData) {
    const bookList = [];
    for (let i = 0; i < bookData.length; i++) {
        const newBook = new Book(bookData[i].bookid, bookData[i].title, bookData[i].author, bookData[i].isbn);
        bookList.push(newBook);
    }

    return bookList;
}
