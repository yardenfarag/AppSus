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
                id: "n102", 
                type: "note-img", 
                info: { imgUrl:'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80', 
                        txt: "WOW" }, 
                style: { backgroundColor: "#eb705e" }, 
            }, 
            { 
                id: "n104", 
                type: "note-video", 
                isPinned: false,
                info: { vidUrl: 'https://www.youtube.com/embed/wtG6I5wgHuA', txt: "" }, 
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
                info: { txt: "My First Note!" },
                style: { backgroundColor: "#9957bb" }, 
            },
            { 
                id: "n107", 
                type: "note-txt", 
                isPinned: true, 
                info: { txt: 'There are a few reasons why winter is the best season. For one, the weather is usually pretty good. It\'s not too hot and not too cold, and there\'s often a nice breeze. Additionally, winter is a great time to be indoors. You can curl up with a blanket and a good book, or watch a movie. And, of course, winter is the time for holidays!' },
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
            { 
                id: "n109", 
                type: "note-txt", 
                isPinned: false, 
                info: { txt: 'I really like food. It is one of my favorite things. I love to eat and I love to cook. I am always trying new recipes and experimenting with new ingredients. I am always on the lookout for new and interesting foods to try. I love to eat out, but I also love to cook at home. I am always trying to find new and interesting ways to prepare food.' },
                style: { backgroundColor: "#3296e1" }, 
            },
            { 
                id: "n110", 
                type: "note-img", 
                isPinned: false,
                info: { imgUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWVtZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60', txt: "" }, 
                style: { backgroundColor: "#344860" }, 
            },
            { 
                id: "n111", 
                type: "note-video", 
                isPinned: true,
                info: { vidUrl: 'https://www.youtube.com/embed/7EENeP-wFgU', txt: "Study Music" }, 
                style: { backgroundColor: "#eb705e" }, 
            },
            { 
                id: "n112", 
                type: "note-img", 
                isPinned: false,
                info: { imgUrl: 'https://vuejs.org/images/logo.png', txt: "I 🤍 VUE" }, 
                style: { backgroundColor: "#49caae" }, 
            },
            { 
                id: "n113", 
                type: "note-todos", 
                isPinned: true,
                info: { 
                    txt: "To Dos", 
                    todos: ['Go to the Bank', 'Get Mail', 'Get Groceries', 'Call Mom'] 
                }, 
                style: { backgroundColor: "#9957bb" }, 
            },
            { 
                id: "n114", 
                type: "note-txt", 
                isPinned: false, 
                info: { txt: 'I\'m a cat lover, and I have two cats of my own. I\'m also a big fan of all things cat-related, from cat memes to cat videos. In short, if it\'s about cats, I\'m probably into it.' },
                style: { backgroundColor: "#eb705e" }, 
            },
            { 
                id: "n115", 
                type: "note-video", 
                isPinned: false,
                info: { vidUrl: 'https://www.youtube.com/embed/23RirKg-zfo', txt: "" }, 
                style: { backgroundColor: "#344860" }, 
            },
            { 
                id: "n116", 
                type: "note-todos", 
                isPinned: true,
                info: { 
                    txt: "Features to Support", 
                    todos: ['Note-Canvas', 'Note-Audio', 'Note-Map'] 
                }, 
                style: { backgroundColor: "#9957bb" }, 
            },
            { 
                id: "n117", 
                type: "note-img", 
                isPinned: true,
                info: { imgUrl: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8YnJhbmRpbmd8ZW58MHx8MHx8&w=1000&q=80', txt: "" }, 
                style: { backgroundColor: "#3296e1" }, 
            },
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}