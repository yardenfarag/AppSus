import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../general/services/event-bus.service.js'

import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'

export default {
    name: 'note-app',
    template: `
        <section className="note-app">
            <h1>Notes!</h1>
            <note-add/>
            <note-list v-if="pinnedNotes" :notes="pinnedNotesForShow" @changeStyle="changeNoteColor" @pin="pinNote" @remove="removeNote"/>
            <note-list v-if="notes" :notes="notesForShow" @changeStyle="changeNoteColor" @pin="pinNote" @remove="removeNote"/>
        </section>
    `,
    data() {
        return {
            notes: null,
            pinnedNotes: null,
        }
    },
    methods: {
        removeNote(noteId) {
            console.log(noteId)
            noteService.remove(noteId)
            .then(() => {
                const idx = this.notes.findIndex(note => note.id === noteId)
                this.notes.splice(idx, 1)
                showSuccessMsg('Note Removed Successfully!')
            })
            .catch(() => showErrorMsg('Something Went Wrong'))
        },
        pinNote(noteId) {
           noteService.get(noteId)
           .then(note => {
            note.isPinned = !note.isPinned
            noteService.updateNote(note)
            .then(() => {
                 noteService.query()
                 .then(notes => {
                 console.log(notes) 
                 this.notes = notes.filter(note => !note.isPinned)
                })
            })
        })

        },
        changeNoteColor(noteId, color) {
            noteService.get(noteId)
           .then(note => {
            note.style.backgroundColor = color
            noteService.updateNote(note)
            .then(() => {
                 noteService.query()
                 .then(notes => {
                 console.log(notes) 
                 this.notes = notes.filter(note => !note.isPinned)
                })
            })
        })
        },
    },
    computed: {
        notesForShow() {
            if (!this.notes) return
            return this.notes.filter(note => !note.isPinned)
        },
        pinnedNotesForShow() {
            if (!this.pinnedNotes) return

            noteService.query()
                 .then(notes => {
                    let pinnedNotesForDisplay = notes.filter(note => note.isPinned)
                    this.pinnedNotes = pinnedNotesForDisplay
                 })

            return this.pinnedNotes
        }
    },
    created() {
        noteService.query()
        .then(notes => {
            this.pinnedNotes = notes.filter(note => note.isPinned)
            this.notes = notes.filter(note => !note.isPinned)
        })
    },
    components: {
        noteList,
        noteAdd,
    }
}