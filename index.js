const express = require("express");
const app = express();
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
const PORT = 3000;

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view-engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

let comments = [
  { id: uuid(), username: "Orange", comment: "I'm orange" },
  { id: uuid(), username: "Apples", comment: "I'm green" },
];

app.get("/comments", (req, res) => {
  res.render("index.ejs", { comments });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
