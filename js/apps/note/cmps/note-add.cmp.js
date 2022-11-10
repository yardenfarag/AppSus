import { noteService } from "../services/note.service.js"

export default {
    name: 'note-add',
    emits: ['save'],
    template: `
        <section>
            <form @submit.stop="saveNote(noteToEdit)" class="note-add" >
                <input type="text" :placeholder="placeholder" v-model="noteToEdit.info.txt" autofocus/>
                <div class="note-types">
                    <button @click="noteToEditType('note-txt')" title="Text"><i class="fa-solid fa-font"></i></button>
                    <button @click="noteToEditType('note-img')" title="Image"><i class="fa-solid fa-image"></i></button>
                    <button @click="noteToEditType('note-video')" title="Video"><i class="fa-brands fa-youtube"></i></button>
                    <button @click="noteToEditType('note-todos')" title="Todos"><i class="fa-solid fa-square-check"></i></button>
                    <button class="note-save-btn" title="Save"><i class="fa-solid fa-floppy-disk"></i></button>
                </div>
            </form>
        </section>
    `,
    data() {
        return {
            placeholder: "Take a note...",
            noteToEdit: noteService.getEmptyNote()
        }
    },
    created() {

    },
    methods: {
        noteToEditType(type) {
            if (type === 'note-txt') this.placeholder = "Type Somthing Here..."
            if (type === 'note-img') this.placeholder = "Paste Your Image URL Here..."
            if (type === 'note-video') this.placeholder = "Paste Your (Embed) Video URL Here..."
            if (type === 'note-todos') this.placeholder = "List Your Todos"
            this.newNote.type = type
        },
        saveNote(noteToEdit) {
            const note = JSON.parse(JSON.stringify(noteToEdit))
            this.$parent.$emit('save', note)
            console.log(note)
        }
    }
}