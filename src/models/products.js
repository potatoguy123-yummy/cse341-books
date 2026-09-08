import { getDb } from "../db/connect.js";

const getAllProducts = async () => {
    const db = getDb();
    const collection = db.collection("products");
    const products = await collection.find({}).toArray();
    return products;
};

const getProduct = async (productId) => {
    const db = getDb();
    const collection = db.collection("products");
    const products = await collection.findOne({ id: productId });
    return products;
};

const createProduct = async (product) => {
    const db = getDb();
    const collection = db.collection("products");
    const result = await collection.insertOne(product);
    return result;
};

const deleteProduct = async (productId) => {
    const db = getDb();
    const collection = db.collection("products");
    const result = await collection.deleteOne({ id: productId });
    return result;
};

const updateProduct = async (productId, updatedProduct) => {
    const db = getDb();
    const collection = db.collection("products");
    const result = await collection.updateOne({ id: productId }, { $set: updatedProduct });
    return result;
};

export { getProduct, getAllProducts, createProduct, deleteProduct, updateProduct };
