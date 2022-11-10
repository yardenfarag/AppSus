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
        style: { backgroundColor: "rgb(52, 50, 53)" },
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
                style: { backgroundColor: "#3296e1" }, 
            }, 
            { 
                id: "n102", 
                type: "note-img", 
                info: { imgUrl:'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80', 
                        txt: "WOW" }, 
                style: { backgroundColor: "#eb705e" }, 
            }, 
            { 
                id: "n103", 
                type: "note-todos", 
                isPinned: false,
                info: { 
                    txt: "Get my stuff together", 
                    todos: ['Driving liscence','Coding power']
                    },
                style: { backgroundColor: "#c13a24" }, 
            },
            { 
                id: "n104", 
                type: "note-video", 
                isPinned: false,
                info: { vidUrl: 'https://www.youtube.com/embed/wtG6I5wgHuA', txt: "OMG" }, 
                style: { backgroundColor: "#344860" }, 
            },
            { 
                id: "n105", 
                type: "note-img", 
                isPinned: false,
                info: { imgUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', txt: "Puppies!" }, 
                style: { backgroundColor: "#49caae" }, 
            },
            { 
                id: "n106", 
                type: "note-txt", 
                isPinned: true, 
                info: { txt: "I am a note!" },
                style: { backgroundColor: "#9957bb" }, 
            },
            { 
                id: "n107", 
                type: "note-txt", 
                isPinned: false, 
                info: { txt: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam assumenda odit eaque ipsam doloremque eveniet eum officiis ipsum! Adipisci libero temporibus nam expedita non nobis fuga deserunt dolor minima in.' },
                style: { backgroundColor: "#344860" }, 
            },
            { 
                id: "n108", 
                type: "note-todos", 
                isPinned: false,
                info: { 
                    txt: "Groceries", 
                    todos: ['Milk', 'Cheese', 'Bread', 'Bananas', 'Drinks', 'Snacks', 'Fruit', 'Cereal'] 
                }, 
                style: { backgroundColor: "#c13a24" }, 
            },
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}