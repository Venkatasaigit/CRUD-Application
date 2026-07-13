const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const app = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 10000;

app.use("/api", middlewares, router);

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});