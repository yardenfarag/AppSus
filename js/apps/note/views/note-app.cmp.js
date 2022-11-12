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
                <p><i class="fa-solid fa-thumbtack"></i></p>
            </div>
            <note-list v-if="pinnedNotes" :notes="pinnedNotesForShow" @duplicate="duplicateNote" @changeStyle="changeNoteColor" @pin="pinNote" @remove="removeNote"/>
            <div className="pin-title-bottom">
                <p><i class="fa-solid fa-thumbtack"></i></p>
            </div>
            <note-list v-if="notes" :notes="notesForShow" @duplicate="duplicateNote" @changeStyle="changeNoteColor" @pin="pinNote" @remove="removeNote"/>
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
        duplicateNote(noteId) {
            let duplicate = noteService.getEmptyNote()
            noteService.get(noteId)
            .then(note => {
                duplicate.type = note.type
                duplicate.isPinned = note.isPinned
                duplicate.info.txt = note.info.txt
                duplicate.info.imgUrl = note.info.imgUrl
                duplicate.info.vidUrl = note.info.vidUrl
                duplicate.info.todos = note.info.todos
                duplicate.style.backgroundColor = note.style.backgroundColor
                
            })
            noteService.save(duplicate)
            .then(note => {
                const idx = this.notes.findIndex(note => note.id === noteId)
                this.notes.splice(idx, 0, note)
                showSuccessMsg('Note Added Successfully!')
            })
            .catch(() => showErrorMsg('Something Went Wrong...'))
            
        },
        filter(ev) {
            eventBus.on('filter', payload => {
                this.filterBy = payload
            })
        },
        mailToNote(mail) {
            console.log(mail)
          const note = noteService.getEmptyNote()
            note.type = 'note-txt'
            note.info.title = mail.subject
            note.info.txt = mail.body
            note.isPinned = true
            console.log(note)
            this.addNote(note)
        },
        updateNote(note) {
            console.log(this.notes)
            if (note.type === 'note-todos') {
                let todos = note.info.todos.split(',')
                note.info.todos = todos
            }
            noteService.save(note)
            .then(note => {
                console.log(note)
            })
        },
        addNote(note) {
            console.log(this.notes);
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
                regex.test(note.info.txt) &&
                regex.test(note.type))
        },
        pinnedNotesForShow() {
            if (!this.pinnedNotes) return

            noteService.query()
                 .then(notes => {
                    const regex = new RegExp(this.filterBy.txt, 'i')
                    let pinnedNotesForDisplay = notes.filter(note => note.isPinned &&
                        regex.test(note.info.txt) &&
                        regex.test(note.type))
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
        eventBus.on('mailToNote', payload => {this.mailToNote(payload)})
    },
    components: {
        noteList,
        noteAdd,
        noteFilter,
    }
}