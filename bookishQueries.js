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
    const bookList = await constructAllBookList(books.rows);

    return bookList;
}

async function constructAllBookList(bookData) {
    const bookList = [];
    for (let i = 0; i < bookData.length; i++) {
        const newBook = new Book(bookData[i].bookid, bookData[i].title, bookData[i].author, bookData[i].isbn);
        bookList.push(newBook);
    }

    return bookList;
}

export async function queryForRentalList(userID) {
    const rentals = await client.query("SELECT * FROM public.rentals");
    const rentalList = await constructUserRentalList(rentals.rows, userID)

    return rentalList
}

async function constructUserRentalList(rentalList, userID) {
    const allBookList = await queryForBookList();
    const usersRentalList = filterRentalsList(userID, rentalList, allBookList);

    const outputRentalList = [];
    for (let i = 0; i < usersRentalList.length; i++) {
        for (let j = 0; j < allBookList.length; j++) {
            if (usersRentalList[i].bookid === allBookList[j].bookID) {
                const bookname = allBookList[j].title;

                const dueDate = usersRentalList[i].rentalduedate;
                outputRentalList.push({name : bookname, dueDate : dueDate})
            }
        }
    }
    
    return outputRentalList;
}

function filterRentalsList(userID, allRentalList, allBookList) {
    const usersRentalList = []
    for (let i = 0; i < allRentalList.length; i++) {
        
        if (Number(userID) === allRentalList[i].userid) {
            usersRentalList.push(allRentalList[i]);
        }
    }

    return usersRentalList;
}

export async function authenticateLoginInfo(username, password) {
    const userInfo = await client.query("SELECT * FROM public.userInfo");
    const userInfoList = userInfo.rows;
    for (let i = 0; i < userInfoList.length; i++) {
        if (userInfoList[i].password === password && userInfoList[i].name === username) {
            return true;
        }
    }

    return false;
}