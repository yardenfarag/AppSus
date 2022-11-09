import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../general/services/event-bus.service.js'

import noteList from '../cmps/note-list.cmp.js'

export default {
    name: 'note-app',
    template: `
        <section className="note-app">
            <h1>Notes!</h1>
            <note-list v-if="notes" :notes="notes" @pin="pinNote" @remove="removeNote"/>
        </section>
    `,
    data() {
        return {
            notes: null,
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
           const note = noteService.get(noteId)
           note.isPinned = !note.isPinned
           noteService.updateNote(note)
           .then(() => {
                noteService.query()
                .then(notes => {
                console.log(notes);
                this.notes = notes
        })
           })

        }
    },
    created() {
        noteService.query()
        .then(notes => {
            console.log(notes)
            this.notes = notes
        })
    },
    components: {
        noteList,
    }
}