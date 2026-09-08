import express from "express";
import router from "./src/router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Working" });
});

app.use((req, res) => {
    return res.status(404).json({ message: "Not found" });
});

export default app;
