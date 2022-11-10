import { noteService } from "../services/note.service.js"

export default {
    name: 'note-add',
    emits: ['save'],
    template: `
        <section>
            <form @submit.stop.prevent="saveNote(noteToEdit)" class="note-add" >
                <div className="inputs">
                    <input type="text" :placeholder="placeholder" v-model="noteToEdit.info.txt" autofocus/>
                    <input :class="showClass" type="text" :placeholder="typePlaceholder" v-model="info" autofocus/>
                </div>
                <div class="note-types">
                    <button @click.stop.prevent="noteToEditType('note-txt')" title="Text"><i class="fa-solid fa-font"></i></button>
                    <button @click.stop.prevent="noteToEditType('note-img'); openSecondInput()" title="Image"><i class="fa-solid fa-image"></i></button>
                    <button @click.stop.prevent="noteToEditType('note-video'); openSecondInput()" title="Video"><i class="fa-brands fa-youtube"></i></button>
                    <button @click.stop.prevent="noteToEditType('note-todos'); openSecondInput()" title="Todos"><i class="fa-solid fa-square-check"></i></button>
                    <button @click.stop.prevent="saveNote(noteToEdit)" class="note-save-btn" title="Save"><i class="fa-solid fa-floppy-disk"></i></button>
                </div>
            </form>
        </section>
    `,
    data() {
        return {
            placeholder: "Take a note...",
            typePlaceholder: '',
            noteToEdit: noteService.getEmptyNote(),
            noteInfoProp: 'txt',
            isSecondInputShow: false,
            info: '',
        }
    },
    created() {
    },
    methods: {
        openSecondInput() {
            this.isSecondInputShow = !this.isSecondInputShow
        },
        noteToEditType(type) {
            if (type === 'note-txt') {
                this.noteInfoProp = 'txt'
                this.placeholder = "Type Somthing Here..."
            }
            if (type === 'note-img') {
                this.noteInfoProp = 'imgUrl'
                this.noteToEdit.info[this.noteInfoProp] = ''
                this.typePlaceholder = "Paste Your Image URL Here..."
            }
            if (type === 'note-video') {
                this.noteInfoProp = 'vidUrl'
                this.noteToEdit.info[this.noteInfoProp] = ''
                this.typePlaceholder = "Paste Your (Embed) Video URL Here..."
            }
            if (type === 'note-todos') {
                this.noteInfoProp = 'todos'
                this.noteToEdit.info[this.noteInfoProp] = {}
                this.typePlaceholder = "List Your Todos"
            }
            this.noteToEdit.type = type
        },
        saveNote(noteToEdit) {
            noteToEdit.info[this.noteInfoProp] = this.info
            const note = JSON.parse(JSON.stringify(noteToEdit))
            this.$emit('save', note)
            this.typePlaceholder = ''
            this.noteToEdit.info.txt = ''
            this.info = ''
            this.isSecondInputShow = false
        },
    },
    computed: {
        note() {
            return this.noteToEdit.info[this.noteInfoProp]
        },
        showClass() {
            if (this.isSecondInputShow) return 'seondary show'
            else return 'secondary'
        }
    }
}