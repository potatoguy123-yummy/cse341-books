import app from "./app.js";
import { connectToDb } from "./src/db/connect.js";

const PORT = process.env.PORT;

if (!PORT) {
    throw new Error("No port is set!");
}

const startServer = async () => {
    try {
        await connectToDb();
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
		return;
    }
	app.listen(PORT, () => {
		console.log(`Server listening on http://127.0.0.1:${PORT}`);
	});
};

await startServer();
