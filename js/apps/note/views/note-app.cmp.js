import { noteService } from '../services/note.service.js'

import noteList from '../cmps/note-list.cmp.js'

export default {
    template: `
        <section className="note-app">
            <note-list/>
        </section>
    `,
    components: {
        noteList,
    }
}