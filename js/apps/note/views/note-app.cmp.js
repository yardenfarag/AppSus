import { noteService } from '../services/note.service.js'

import noteList from '../cmps/note-list.cmp.js'

export default {
    template: `
        <section className="note-app">
            <h1>Notes!</h1>
            <note-list v-if="notes" :notes="notes"/>
        </section>
    `,
    data() {
        return {
            notes: null,
        }
    },
    methods: {

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