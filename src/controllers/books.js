import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../models/books.js";
import { getAuthor } from "../models/authors.js";

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    } catch (error) {
        console.error("GET /books failed:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getBookByIdHandler = async (req, res) => {
    const requestedId = req.params.id;

    try {
        const book = await getBookById(requestedId);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error("GET /books/:id failed:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const createBookHandler = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Invalid request" });
        }

        const { id, authorId, title, publicationDate } = req.body;

        if (!id || !authorId || !title || !publicationDate) {
            return res.status(400).json({ message: "id, authorId, title, and publicationDate are required" });
        }

        if (await getBookById(id)) {
            return res.status(400).json({ message: "Book already exists" });
        }

        if (!await getAuthor(authorId)) {
            return res.status(400).json({ message: "Author not found" });
        }

        const newBook = { id, authorId, title, publicationDate };
        await createBook(newBook);

        return res.status(201).json(newBook);
    } catch (error) {
        console.error("POST /books failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateBookHandler = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const { authorId, title, publicationDate } = req.body;

        if (!authorId || !title || !publicationDate) {
            return res.status(400).json({ message: "authorId, title, and publicationDate are required" });
        }

        if (!await getAuthor(authorId)) {
            return res.status(400).json({ message: "Author not found" });
        }

        if (!await getBookById(id)) {
            return res.status(404).json({ message: "Book not found" });
        }

        const book = { id, authorId, title, publicationDate };
        await updateBook(id, book);

        return res.status(200).json(book);
    } catch (error) {
        console.error("PUT /books/:id failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteBookHandler = async (req, res) => {
    try {
        const id = req.params.id;

        if (!await getBookById(id)) {
            return res.status(404).json({ message: "Book not found" });
        }

        await deleteBook(id);

        return res.status(204).end();
    } catch (error) {
        console.error("DELETE /books/:id failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { getBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler };
