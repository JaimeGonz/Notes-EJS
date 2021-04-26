const fs = require("fs")
const chalk = require("chalk")

const addNote = function(title, body){
    let notes = loadNotes()
    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

    if (duplicateNotes.length === 0){
        note = {
            title:title,
            body:body
        }
        notes.push(note)
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else{
        console.log(chalk.red("The note already exists"))
    }
}

const saveNotes = function(notes){
    //JSON.stringify convierte un objeto JavaScript (note) a un JSON string
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json",notesJSON)
}

const loadNotes = function(){
    try{
        dataBuffer = fs.readFileSync("notes.json")
        data = dataBuffer.toString()
        //JSON.parse convierte un JSON string a un objeto JavaScript
        notesJSON = JSON.parse(data)
        return notesJSON
    }catch (e){
        console.log(chalk.red("File does not exist!"))
        return []
    }
}

const listNotes = () => {
    let notes = loadNotes()
    console.log(chalk.yellow.bold("--------- NOTES -----------------------"))
    notes.forEach((element) => {
        console.log(chalk.blue.bold("Title: ") + element.title + chalk.blue.bold(" Body: ") + element.body ) 
    })
    console.log(chalk.yellow.bold("--------------------------------------"))
    return notes
}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((elemento) => {
        return elemento.title === title
    })

    if (foundNote) {
        console.log("Title: " + foundNote.title + " Body: " + foundNote.body)
    }
    return foundNote
}

const removeNote = (title) => {
    let notes = loadNotes()
    console.log(chalk.bgYellow.bold("Notas actuales... "), notes)
    console.log(chalk.magenta.bold("Removiendo nota..."))
    const notesToKeep = notes.filter((note) => {
        return note.title != title
    })

    if(notesToKeep.length != notes.length){
        saveNotes(notesToKeep)
        console.log(chalk.red.bold("Nota eliminada ", title))
        console.log(chalk.green.bold("Notas actualizadas... "))
        console.log(notes = loadNotes())
    }else{
        console.log(chalk.red.bold("ERROR: La nota no existe"))
    }
}

const modifyNote = (title, nTitle, nBody) => {
    let notes = loadNotes()
    const oldNotes = loadNotes()

    console.log(chalk.magenta.bold("\nModifying note: "+chalk.blue(title)))
    console.log(chalk.green(title, nTitle, nBody));
    notes.forEach((element) => {
        if(element.title === title) {
            element.title = nTitle
            element.body = nBody
        }
    })
    if (JSON.stringify(notes) != JSON.stringify(oldNotes)){
        saveNotes(notes)
        console.log(chalk.yellow.bold("Note updated"))
    }else{
        console.log(chalk.red.bold("\nERROR: Title not found!\n"))
    }
}

module.exports ={
    addNote:addNote,
    listNotes:listNotes,
    readNote:readNote,
    removeNote:removeNote,
    modifyNote:modifyNote
}