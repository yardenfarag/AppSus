export default {
    template: `
        <section>
            <form @submit.prevent.stop="saveNote" class="note-add" >
                <input type="text" :placeholder="placeholder" v-model:value="newNote.info.txt" autofocus>
                <div class="note-types">
                    <button @click="newNoteType('note-txt')" title="Text">txt</button>
                    <button @click="newNoteType('note-img')" title="Image">img</button>
                    <button @click="newNoteType('note-video')" title="Video">video</button>
                    <button @click="newNoteType('note-todos')" title="Todos">todos</button>
                    <button class="note-save-btn" title="Save">save</button>
                </div>
            </form>
        </section>
    `,
    data() {
        return {
            placeholder: "Take a note...",
            newNote: {
                type: 'note-txt',
                isPinned: false,
                info: {
                    txt: ''
                },
                style: { backgroundColor: "transparent" }, 
            },
        }
    },
    created() {

    },
    methods: {
        newNoteType(type) {
            if (type === 'note-txt') this.placeholder = "Type Somthing Here..."
            if (type === 'note-img') this.placeholder = "Paste Your Image URL Here..."
            if (type === 'note-video') this.placeholder = "Paste Your (Embed) Video URL Here..."
            if (type === 'note-todos') this.placeholder = "List Your Todos"
            this.newNote.type = type
        },
        saveNote() {
            if (!this.newNote.info.txt) return
            this.$parent.$emit('addNewNote', newNote)      
        }
    }
}