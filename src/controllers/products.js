import { getProduct, getAllProducts, createProduct, deleteProduct, updateProduct } from "../models/products.js";

const createProductHandler = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Invalid request" });
        }

        const { id, name, category, price, inStock } = req.body;

        if (!id || !name || !category || price == null || inStock == null) {
            return res.status(400).json({ message: "id, name, category, price, and inStock are required" });
        }

        if (await getProduct(id)) {
            return res.status(409).json({ message: "Product already exists" });
        }

        const newProduct = { id, name, category, price, inStock };
        await createProduct(newProduct);

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error("POST /products failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const readProductsHandler = async (req, res) => {
    try {
        const products = await getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.error("GET /products failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const readProductHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getProduct(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error("GET /products/:id failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const updateProductHandler = async (req, res) => {
    try {
        const id = req.params.id;

        if (!req.body) {
            return res.status(400).json({ message: "Invalid request" });
        }
        const { name, category, price, inStock } = req.body;

        if (!id || !name || !category || price == null || inStock == null) {
            return res.status(400).json({ message: "id, name, category, price, and inStock are required" });
        }

        if (!await getProduct(id)) {
            return res.status(404).json({ message: "Product not found" });
        }

        const product = { id, name, category, price, inStock };
        await updateProduct(id, product);

        return res.status(204).end();
    } catch (error) {
        console.error("PUT /products/:id failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const deleteProductHandler = async (req, res) => {
    try {
        const id = req.params.id;

        if (!await getProduct(id)) {
            return res.status(404).json({ message: "Product not found" });
        }

        await deleteProduct(id);

        return res.status(204).end();
    } catch (error) {
        console.error("DELETE /products/:id failed:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export { createProductHandler, readProductHandler, readProductsHandler, updateProductHandler, deleteProductHandler };
