const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const logger = (req, res, next) => {
    
    const timestamp = new Date().toISOString().replace(/T/, ' ').slice(0, 16);

    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
        };

app.use(logger);


app.get("/", (req, res) => {
    res.send("Welcome to the Express App!");
});

app.get("/about", (req, res) => {
    res.send("This is not a beginner's Express application.");
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})


app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}   );
