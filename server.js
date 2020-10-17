var express = require("express");
const fs = require("fs");
var path = require("path");
var app = express();
var PORT = 3000;
const { v4: uuidv4 } = require("uuid");
var jsonData = ("./data/db.json")

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes 
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});


app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  // var jsonData = fs.readFileSync(path.join(__dirname, "./data/db.json"));
  res.json(jsonData);
});


app.post("/api/notes", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newNote = req.body;
  newNote.id = uuidv4()
  // jsonData.push(newNote);
  fs.writeFile("./data/db.json", JSON.stringify(jsonData),  (err) => {
    if (err){
       throw err;
    }
  res.json()
  });
});


// app.delete("/api/notes", function(req, res) {
//   const id = req.params.id;

//   for (var i = 0; i < jsonData.length; i++) { 
//     this.jasonData[i] =={}
//     }

// });




// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
