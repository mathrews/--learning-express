const express = require("express");
const app = express();
const port = 4500;
const usersRoutes = require("./src/routes/usersRoutes.js");
const songsRoutes = require("./src/routes/songsRoutes.js");
const stylesRoutes = require("./src/routes/stylesRoutes.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to teteuso API");
});

app.use("/users", usersRoutes);
app.use("/songs", songsRoutes);
app.use("/styles", stylesRoutes);

app.all("*", (req, res) => {
  res.status(404).send("not foundou bruh");
});

app.listen(port, () => {
  console.log(`This server is running on this url: http://localhost:${port}`);
});
