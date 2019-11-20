//Dependencies

const express = require("express"),
    path = require("path"),
    fs = require("fs");

//set up Express app
const app = express(),
    PORT = process.env.PORT || 3000;

//Express middleware to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Notes (data)

let notes = [
    {
        routeName: "testing",
        id: "1",
        title: "Test Title",
        text: "asdasasdasdlklk"
    }
];

//Routes to HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
});

//Routes to API
//Getting the notes
app.get("/api/notes", (req, res) => {
    fs.readFile("db.json", (err, data) => {
        if (err) throw err;

        res.end(data)
    })
});


//starts server
app.listen(PORT, () => {
    console.log(`App's listening on: ${PORT}`)
});