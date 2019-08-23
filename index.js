const express = require("express");
const path = require("path");

const app = express();

const movies = require("./routes/Movies.js");

// app.set("view engine", "pug");
// app.set("views", "./views");

app.use("/", movies);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/index.html"));
// });

app.listen(6060, () => {
  console.log("Started Listening at port 6060....!");
});
