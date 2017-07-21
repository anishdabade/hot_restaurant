// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Tables (DATA)
// =============================================================

var tables = [{
  customerName: "yoda",
  phoneNumber: "1234567890",
  customerEmail: "yoda@gmail.com",
  customerID: "Yoda's Table"
}];

var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Get all tables
app.get("/api/tables", function(req, res) {
  res.json(tables);
});

// Get all waitlist
app.get("/api/waitlist", function(req, res) {
  res.json(waitlist);
});

// Create New Table - takes in JSON input
app.post("/api/new", function(req, res) {
  var newtable = req.body;

  console.log(newtable);

  if (tables.length < 5) {
    tables.push(newtable);
  }
  else {
    waitlist.push(newtable);
  }

  res.json(newtable);
});

app.post("/api/clear", function(req, res) {
  tables = [];
  waitlist = [];
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});