const { response } = require("express");
const express = require("express")
const notes = require("./notes.js")

// Permite crear el servidor web
// Crea un objeto app que representa mi app web mediante un servidor
const app = express();

// Definir puerto de escucha
const port = 3000;

// Definir motor de plantillas
app.set("view engine", "ejs")
//app.use(express.static(__dirname+"/views"))

app.use(express.static("public"))

app.get("/" , function(request, response){
    // response.send("¡Hola mundo!")
    response.render("index", {
        message : "Welcome to App Notes"
    })
})

app.get("/list", function(request, response){
    const notes_array = notes.listNotes();
    response.render("list", {
        notes_array : notes_array
    })
    //console.log(notes_array);
})

app.get("/add", function(request, response){
    response.render("add")
})

app.get('/delete', (req, res) => {
    res.render("delete")
})

app.get('/modify', (req, res) => {
    res.render("modify")
})

app.get('/search', (req, res) => {
    res.render("search")
})

// Funcion flecha --> app.get("/list_notes", (request, response) => { })

// Middleware de express para extraer valores del body de petición HTML.
app.use(express.urlencoded({
    extended : true 
}));

app.post("/add", function(request, response){
    const title = request.body.title
    const body = request.body.body
    notes.addNote(title, body)
    response.redirect("/list")
})

app.get("/notes_created", function(request, response){
    response.render("notes_created.ejs")
    // response.render("notes_created")
})

app.listen(port, function(){
    console.log("Listening at http://localhost:3000")
})

app.post("/modify", function(request, response){
    const title = request.body.title;
    const nTitle = request.body.ntitle;
    const nBody = request.body.nbody;
    notes.modifyNote(title, nTitle, nBody);

    const notes_array = notes.listNotes();
    response.render("list", {
        notes_array : notes_array
    })
});

app.post("/delete", function(request, response){
    const title = request.body.title;
    notes.removeNote(title);
    const notes_array = notes.listNotes();
    response.render("list", {
        notes_array : notes_array
    })
});

app.post("/search", function(request, response){
    const title = request.body.title;
    const note = notes.readNote(title);
    response.render("search", {
        note : note
    })
});