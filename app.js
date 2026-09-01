import express from "express";
import router from "./src/router.js";

const app = express();

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Working" });
});

app.use((req, res) => {
    return res.status(404).json({ message: "Not found" });
});

export default app;
