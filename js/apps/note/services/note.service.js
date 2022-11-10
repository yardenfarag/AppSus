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
    updateNote,
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
    if(note.id){
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function updateNote(note) {
    return storageService.put(NOTE_KEY, note)
}

function getEmptyNote() {
    return {
        id: '', 
        type: 'note-txt', 
        isPinned: false,
        info: {txt: ''},
        style: { backgroundColor: "transparent" },
    }
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
                info: { txt: "Fullstack Me Baby!" },
                style: { backgroundColor: "transparent" }, 
            }, 
            { 
                id: "n102", 
                type: "note-img", 
                info: { imgUrl:'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80', 
                        txt: "WOW" }, 
                style: { backgroundColor: "transparent" }, 
            }, 
            { 
                id: "n103", 
                type: "note-todos", 
                isPinned: false,
                info: { 
                    txt: "Get my stuff together", 
                    todos: [ 
                    { txt: "Driving liscence", doneAt: null }, 
                    { txt: "Coding power", doneAt: 187111111 }, 
                ] }, 
                style: { backgroundColor: "transparent" }, 
            },
            { 
                id: "n104", 
                type: "note-video", 
                isPinned: false,
                info: { vidUrl: 'https://www.youtube.com/embed/wtG6I5wgHuA', txt: "OMG" }, 
                style: { backgroundColor: "transparent" }, 
            },
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}