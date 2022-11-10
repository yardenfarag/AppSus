import { noteService } from '../services/note.service.js'
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../general/services/event-bus.service.js'

import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'

export default {
    name: 'note-app',
    template: `
        <section className="note-app">
            <note-add @save="addNote"/>
            <note-filter @filter="filter"/>
            <div className="pin-title">
                <p>Pinned</p>
            </div>
            <note-list v-if="pinnedNotes" :notes="pinnedNotesForShow" @changeStyle="changeNoteColor" @pin="pinNote" @remove="removeNote"/>
            <note-list v-if="notes" :notes="notesForShow" @changeStyle="changeNoteColor" @pin="pinNote" @remove="removeNote"/>
        </section>
    `,
    data() {
        return {
            notes: null,
            pinnedNotes: null,
            filterBy: {},
        }
    },
    methods: {
        filter(filterBy) {
            eventBus.on('filter', payload => {
                this.filterBy = payload
            })
            console.log(this.filterBy);
        },
        addNote(newNote) {
            console.log('lalala');
            console.log(newNote)
            // noteService.save(note)
            // .then(note => {
            //     console.log(note)
            //     this.notes.unshift(note)
            // })
        },
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
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.notes.filter(note => !note.isPinned &&
                regex.test(note.info.txt))
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
        noteFilter,
    }
}