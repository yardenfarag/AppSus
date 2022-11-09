import { utilService } from '../../../general/services/util.service.js'
import { storageService } from '../../../general/services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getNextNoteId,
    getPrevNoteId,
}


function query() {
    return storageService.query(NOTE_KEY)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    note.id = utilService.makeId()
    const notes = query()
    notes.push(note)
    utilService.saveToStorage(NOTE_KEY, notes)
    return note
}

function getEmptyNote() {
    return {id: '', title: '', listPrice: {amount: 0}}
}

function getNextNoteId(noteId) {
    return storageService.query(NOTE_KEY)
    .then(notes => {
        let idx = notes.findIndex(note => note.id === noteId) 
        if (idx === notes.length - 1) idx = -1
        return notes[idx+1].id 
    })
}

function getPrevNoteId(noteId) {
    return storageService.query(NOTE_KEY)
    .then(notes => {
        let idx = notes.findIndex(note => note.id === noteId) 
        if (idx === 0) idx = notes.length
        return notes[idx-1].id 
    })
}


function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            { 
                id: "n101", 
                type: "note-txt", 
                isPinned: true, 
                info: { txt: "Fullstack Me Baby!" } 
            }, 
            { 
                id: "n102", 
                type: "note-img", 
                info: { imgName:'note-image', txt: "Bobi and Me" }, 
                style: { backgroundColor: "#00d" } 
            }, 
            { 
                id: "n103", 
                type: "note-todos", 
                info: { txt: "Get my stuff together", 
                todos: [ 
                    { txt: "Driving liscence", doneAt: null }, 
                    { txt: "Coding power", doneAt: 187111111 } 
                ] } 
            }
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}