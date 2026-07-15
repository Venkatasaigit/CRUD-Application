const express = require("express");
const jsonServer = require("json-server");
const path = require("path");

const app = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));

app.use(express.json());

app.use(express.static(path.join(__dirname, ".")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/User", (req, res) => {
  res.sendFile(path.join(__dirname, "User.html"));
});
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "student dashboard is running" });
});
app.use(jsonServer.defaults());
app.use("/api", router);

const port = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = { app };