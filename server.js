//Dependencies
const express = require("express"),
    path = require("path"),
    fs = require("fs");

//set up Express app
const app = express(),
    PORT = process.env.PORT || 3000;

//Express middleware to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

//Notes (data)
let notes = require("./db/db.json");

//Routes to HTML

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

//Routes to API
app.route('/api/notes')

//Getting all the notes (GET)
    .get((req, res) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                              
        return res.json(notes)
    })
//Adding a new notes to the notes list (POST) 
    .post((req, res) => {
        let newNote = req.body
        
        newNote.id = parseInt(notes[notes.length - 1].id) + 1
        notes.push(newNote)

        fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) =>{
            if (err) throw err;
            return res.json(data)
        })
    });

//Removing a specific note (DELETE)
app.delete("/api/notes/:id", (req, res) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    let id = req.params.id,
    toDelete = notes.findIndex(note => parseInt(note.id) === parseInt(id));

    notes.splice(toDelete, 1)
    
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err, data) =>{
        if (err) throw err;
        return res.json(data)
    })

});
//Default to Home if any invalid path is entered
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

//starts server
app.listen(PORT, () => {
    console.log(`App's listening on: ${PORT}`)
});