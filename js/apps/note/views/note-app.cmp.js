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
        filter(ev) {
            eventBus.on('filter', payload => {
                this.filterBy = payload
            })
        },
        updateNote(note) {
            noteService.save(note)
            .then(note => {
                console.log(note)
            })
        },
        addNote(note) {
            noteService.save(note)
            .then(note => {
                this.notes.unshift(note)
                showSuccessMsg('Note Added Successfully!')
            })
            .catch(() => showErrorMsg('Something Went Wrong...'))
        },
        removeNote(noteId) {
            noteService.remove(noteId)
            .then(() => {
                const idx = this.notes.findIndex(note => note.id === noteId)
                this.notes.splice(idx, 1)
                showSuccessMsg('Note Removed Successfully!')
            })
            .catch(() => showErrorMsg('Something Went Wrong...'))
        },
        pinNote(noteId) {
           noteService.get(noteId)
           .then(note => {
            note.isPinned = !note.isPinned
            noteService.updateNote(note)
            .then(() => {
                 noteService.query()
                 .then(notes => {
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
                    const regex = new RegExp(this.filterBy.txt, 'i')
                    let pinnedNotesForDisplay = notes.filter(note => note.isPinned &&
                        regex.test(note.info.txt))
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
        eventBus.on('filter', payload => {
            this.filterBy = payload
        })
        eventBus.on('saveNote', payload => {this.updateNote(payload)})
    },
    components: {
        noteList,
        noteAdd,
        noteFilter,
    }
}