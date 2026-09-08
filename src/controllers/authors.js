import { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor, authorHasBooks } from "../models/authors.js";

const createAuthorHandler = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Invalid request" });
        }

        const { id, name, birthYear } = req.body;

        if (!id || !name || birthYear == null) {
            return res.status(400).json({ message: "id, name, and birthYear are required" });
        }

        if (await getAuthor(id)) {
            return res.status(400).json({ message: "Author already exists" });
        }

        const newAuthor = { id, name, birthYear };
        await createAuthor(newAuthor);

        return res.status(201).json(newAuthor);
    } catch (error) {
        console.error("POST /authors failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const readAuthorsHandler = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        return res.status(200).json(authors);
    } catch (error) {
        console.error("GET /authors failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const readAuthorHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const author = await getAuthor(id);

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        return res.status(200).json(author);
    } catch (error) {
        console.error("GET /authors/:id failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const updateAuthorHandler = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const { name, birthYear } = req.body;

        if (!name || birthYear == null) {
            return res.status(400).json({ message: "name and birthYear are required" });
        }

        if (!await getAuthor(id)) {
            return res.status(404).json({ message: "Author not found" });
        }

        const author = { id, name, birthYear };
        await updateAuthor(id, author);

        return res.status(200).json(author);
    } catch (error) {
        console.error("PUT /authors/:id failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteAuthorHandler = async (req, res) => {
    try {
        const id = req.params.id;

        if (!await getAuthor(id)) {
            return res.status(404).json({ message: "Author not found" });
        }

        if (await authorHasBooks(id)) {
            return res.status(409).json({ message: "Author still has books" });
        }

        await deleteAuthor(id);

        return res.status(204).end();
    } catch (error) {
        console.error("DELETE /authors/:id failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { createAuthorHandler, readAuthorHandler, readAuthorsHandler, updateAuthorHandler, deleteAuthorHandler };
