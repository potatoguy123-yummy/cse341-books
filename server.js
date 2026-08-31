import app from './app.js';

const PORT = process.env.PORT;

if (!PORT) {
    throw new Error("No port is set!");
}

app.listen(PORT, () => {
    console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
