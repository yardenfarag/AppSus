import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'

export default {
    name: 'note-preview',
    props: ['note'],
    template: `
        <section class="note-preview">
            <div class="note">
                <div className="note-editor">
                    <button @click="pinNote(note.id)" class="note-editor-btn">📌</button>
                    <button @click="changeStyle(note.id)" class="note-editor-btn">🌈</button>
                    <button @click="shareToMail(note.id)" class="note-editor-btn">✉️</button>
                    <button @click="editNote(note.id)" class="note-editor-btn">📝</button>
                    <button @click="removeNote(note.id)" class="note-editor-btn">✖️</button>
                </div>
                <component  
                    :is="note.type" 
                    :info="note.info"> 
                </component>
            </div>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        removeNote(noteId) {
            this.$parent.$emit('remove', noteId)
        },
        pinNote(noteId) {
            this.$parent.$emit('pin', noteId)
        },
        changeStyle(noteId) {
            this.$parent.$emit('change-style', noteId)
        },
        shareToMail(noteId) {
            this.$parent.$emit('share', noteId)
        },
        editNote(noteId) {
            this.$parent.$emit('edit', noteId)
        }      
    },
    computed: {
        renderImg() {
            return `../../../../../assets/img/note/${this.note.info.imgName}.jpeg`
        }
    },
    components: {
        noteImg,
        noteTxt,
        noteVideo,
        noteTodos,
    }
}
