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