var express = require("express");
const fs = require("fs");
var path = require("path");
var app = express();
var PORT = 3001;
const { v4: uuidv4 } = require("uuid");
var jsonData = require("./data/db.json");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes 
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {

  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  fs.readFile("./data/db.json", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }

    res.json(data);

  });
});


app.post("/api/notes", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newNote = req.body;
  newNote.id = uuidv4();

  jsonData.push(newNote);
  console.log(newNote);
  fs.writeFile("./data/db.json", JSON.stringify(jsonData), (err) => {
    if (err) {
      throw err;
    }
    res.json(jsonData)
  });

});


app.delete("/api/notes/:id", function (req, res) {
  for (const value of jsonData) {
    if (value.id == req.params.id){

      var i = jsonData.indexOf(value);
      jsonData.splice(i, 1);

      for (var i = 0; i < jsonData.length; i++) {
        jsonData[i].id = i + 1;
      }

      fs.writeFile("./data/db.json", JSON.stringify(jsonData), function (err) {

        if (err) throw err;

      })

      res.json(true);
    }
  }
})


// var newNote = req.body.id
// newNote.id == [];

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
