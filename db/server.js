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
        title: "",
        text: ""
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
    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) throw err;
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(data)
    })
});

//Adding (POST) to the notes
app.post("/api/notes", (req, res) => {
    fs.readFile("db.json", "utf8", (err, data) => {
        if (err) throw err;
        
        fs.writeFile("db.json", "utf8", (err, data) =>{
            let newNote = req.body
            if (err) throw err;
            notes.push(newNote)
            res.json(data)
        })
    // res.end(data)
    })
});


//starts server
app.listen(PORT, () => {
    console.log(`App's listening on: ${PORT}`)
});