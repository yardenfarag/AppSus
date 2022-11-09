import notePreview from "./note-preview.cmp.js"


export default {
    props: ['notes'],
    template: `
        <section className="note-list">
        <div v-for="note in notes" :key="note.id">
            <note-preview :note="note"/>
        </div>
        </section>
    `,
    components: {
        notePreview,
    },
}