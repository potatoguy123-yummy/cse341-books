import express from "express";
import { getBooksHandler, getBookByIdHandler } from "./controllers/books.js";
import { createProductHandler, readProductHandler, readProductsHandler, updateProductHandler, deleteProductHandler } from "./controllers/products.js";

const router = express.Router();

router.get("/books", getBooksHandler);
router.get("/books/:id", getBookByIdHandler);

router.post("/products", createProductHandler);
router.get("/products", readProductsHandler);
router.get("/products/:id", readProductHandler);
router.put("/products/:id", updateProductHandler);
router.delete("/products/:id", deleteProductHandler);

export default router;
