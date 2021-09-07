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

app.get("/comments/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/comments", (req, res) => {
  console.log(req.body);
  const { username, comment } = req.body;
  comments.push({ id: uuid(), username, comment });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("show.ejs", { comment });
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
