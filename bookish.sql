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

INSERT INTO books (title, author, isbn)
VALUES ('Wild Swans', 'Jung Chang', '0006374921'), ('The Secret Life of Trees','Colin Tudge','0141012933');