CREATE TABLE userInfo (
	userID SERIAL PRIMARY KEY,
	password TEXT,
	name TEXT
);

CREATE TABLE books (
	bookID SERIAL PRIMARY KEY,
	title TEXT,
	author TEXT,
	ISBN TEXT
);

CREATE TABLE rentals (
    rentalID serial PRIMARY KEY,
    bookID INT references books(bookID),
    userID TEXT references userinfo(userID),
    rentalOutDate DATE,
    rentalDueDate DATE
)

INSERT INTO books (title, author, isbn)
VALUES ('Wild Swans', 'Jung Chang', '0006374921'), ('The Secret Life of Trees','Colin Tudge','0141012933');

INSERT INTO userinfo (name, password)
VALUES ('userName', 'testPassword');

INSERT INTO rentals (bookid, userid, rentaloutdate, rentalduedate)
VALUES (1,1,'2022-10-04','2022-11-01')

INSERT INTO userinfo (name, password)
VALUES ('userName2', 'testPassword2'),('userName3', 'testPassword3'),('userName4', 'testPassword4');


INSERT INTO books (title, author, isbn)
VALUES ('Philosophy 1', 'A.C. Grayling', '0198752431'), ('Philosophy of Science', 'Martin Curd', '0393971759'), ('The Moon Book', 'Bevan M. French', '0140043403'), ('London Street Trees', 'Paul Wood', '1916045330');

INSERT INTO rentals (bookid, userid, rentaloutdate, rentalduedate)
VALUES (2,2,'2022-09-05','2023-01-12'),(3,3,'2022-07-05','2022-08-10'),(4,4,'2021-12-14','2022-05-15'),(5,1,'2022-09-05','2022-12-19'),(6,2,'2022-04-06','2022-09-21'),(2,3,'2022-08-15','2022-11-10'),(4,4,'2022-06-10','2022-08-06'),(6,1,'2022-01-01','2022-12-25');