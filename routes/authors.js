const express = require("express");
const author = require("../models/author");
const router = express.Router();
const Author = require("../models/author");
// All Authors Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  try {
    const authors = await author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch (error) {
    res.redirect("/");
  }
});

//New Authors Route
router.get("/new", async (req, res) => {
  res.render("authors/new", {
    author: new author(),
  });
});
// Create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    res.redirect("authors");
  } catch {
    let locals = { errorMessage: "Error Creating Author" };
    res.render("authors/new", {
      author: author,
      locals: locals,
    });
  }
  // author.save((err, newAuthor) => {
  //   if (err) {
  //     let locals= { errorMessage: "Error Creating Author" }
  //     res.render("authors/new", {
  //       author: author,
  //       locals: locals,
  //     })
  //   } else {
  //     res.redirect("authors");
  //   }
  // });
});
module.exports = router;
