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
        style: { backgroundColor: "#2b2b2b" },
    }
}

// function changeNoteIdx(note) {
//     const note = get(note)
// }

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
                info: { txt: "My First Note!", title: "I'm so excited!" },
                style: { backgroundColor: "#9957bb" }, 
            },
            { 
                id: "n107", 
                type: "note-txt", 
                isPinned: true, 
                info: {title: "Thoughts", txt: 'There are a few reasons why winter is the best season. For one, the weather is usually pretty good. It\'s not too hot and not too cold, and there\'s often a nice breeze. Additionally, winter is a great time to be indoors. You can curl up with a blanket and a good book, or watch a movie. And, of course, winter is the time for holidays!' },
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
                info: {title: "Thoughts", txt: 'I really like food. It is one of my favorite things. I love to eat and I love to cook. I am always trying new recipes and experimenting with new ingredients. I am always on the lookout for new and interesting foods to try. I love to eat out, but I also love to cook at home. I am always trying to find new and interesting ways to prepare food.' },
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
                info: { imgUrl: 'https://vuejs.org/images/logo.png', txt: "I ???? VUE" }, 
                style: { backgroundColor: "#49caae" }, 
            },
            { 
                id: "n113", 
                type: "note-todos", 
                isPinned: false,
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
                info: {title: "Thoughts", txt: 'I\'m a cat lover, and I have two cats of my own. I\'m also a big fan of all things cat-related, from cat memes to cat videos. In short, if it\'s about cats, I\'m probably into it.' },
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
                id: "n117", 
                type: "note-img", 
                isPinned: false,
                info: { imgUrl: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxzZWFyY2h8MXx8YnJhbmRpbmd8ZW58MHx8MHx8&w=1000&q=80', txt: "" }, 
                style: { backgroundColor: "#3296e1" }, 
            },
            { 
                id: "n118", 
                type: "note-txt", 
                isPinned: false, 
                info: {title: "Thoughts", txt: 'Programming is a lot of fun. It\'s a great way to learn new things and to challenge yourself. There\'s a sense of satisfaction that comes from solving problems and creating something new.It\'s also a lot of work. But it\'s worth it. If you\'re looking for a challenge, something new to learn, and a way to use your creativity, programming is the perfect activity for you.' },
                style: { backgroundColor: "#344860" }, 
            },
            { 
                id: "n120", 
                type: "note-todos", 
                isPinned: false,
                info: { 
                    txt: "To Dos", 
                    todos: ['Get up', 'Eat breakfast', 'Go to work', 'Come home', 'Eat dinner', 'Go to bed'] 
                }, 
                style: { backgroundColor: "#3296e1" }, 
            },
            { 
                id: "n121", 
                type: "note-video", 
                isPinned: false,
                info: { vidUrl: 'https://www.youtube.com/embed/mPZkdNFkNps', txt: "Relax" }, 
                style: { backgroundColor: "#f1c500" }, 
            },
            { 
                id: "n122", 
                type: "note-txt", 
                isPinned: true, 
                info: {title: "About the App", txt: 'The Notes app is the perfect way to jot down ideas, make lists, and keep track of everything you need to do. ' },
                style: { backgroundColor: "#49caae" }, 
            },
            { 
                id: "n123", 
                type: "note-txt", 
                isPinned: false, 
                info: {title: "About the Mail App", txt: 'The Email app is the perfect way to stay in touch with friends, family, and colleagues.' },
                style: { backgroundColor: "#3296e1" }, 
            },
            { 
                id: "n124", 
                type: "note-txt", 
                isPinned: false, 
                info: {title: "About the Books App", txt: 'The Books app is the perfect way to find and read the latest bestsellers.' },
                style: { backgroundColor: "#9957bb" }, 
            },
            { 
                id: "n125", 
                type: "note-img", 
                isPinned: false,
                info: { imgUrl: 'https://res.cloudinary.com/teepublic/image/private/s--eCn6hhEt--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_191919,e_outline:48/co_191919,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1509628922/production/designs/2018878_1.jpg', txt: "????" }, 
                style: { backgroundColor: "#344860" }, 
            },
            { 
                id: "n126", 
                type: "note-img", 
                isPinned: true,
                info: { imgUrl: 'https://play-lh.googleusercontent.com/5bQkqRWOtDq_cyV7obWRYx1vshxgsjHwYKKlGrVp7r7E5_RIAkruNpmsgjC22XAycw8', txt: "Go Rockets!????" }, 
                style: { backgroundColor: "#344860" }, 
            },
            { 
                id: "n127", 
                type: "note-video", 
                isPinned: false,
                info: { vidUrl: 'https://www.youtube.com/embed/vUb4aOypX7A', txt: "Friday Playlist" }, 
                style: { backgroundColor: "#54be76" }, 
            },
            { 
                id: "n128", 
                type: "note-todos", 
                isPinned: true,
                info: { 
                    txt: "Check list for the trip", 
                    todos: ['Ticket', 'Passport', 'Boarding Pass', 'Carry-on luggage', 'Personal items', 'Money', 'Identification'] 
                }, 
                style: { backgroundColor: "#f1c500" }, 
            },
            { 
                id: "n129", 
                type: "note-txt", 
                isPinned: false, 
                info: {title: "Snickers", txt: 'Once upon a time, there was a cat named Snickers. Snickers loved to run around and play all day. One day, when Snickers was out playing, a big dog came by and chased her. Snickers was terrified and ran away as fast as she could. She didn\'t stop running until she got home. Snickers was so scared that she decided to never go outside again.' },
                style: { backgroundColor: "#eb705e" }, 
            },
        ]

        utilService.saveToStorage(NOTE_KEY, notes)
    }
    return notes
}