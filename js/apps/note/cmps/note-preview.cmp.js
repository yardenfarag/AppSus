import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteEdit from './note-edit.cmp.js'

export default {
    name: 'note-preview',
    props: ['note'],
    template: `
        <section class="note-preview">
            <div @click="toggleEditModal" :style="{backgroundColor: note.style.backgroundColor}" class="note">
                <div className="note-editor">
                    <div className="pinning">
                        <button @click="pinNote(note.id)" class="note-editor-btn"><i class="fa-solid fa-thumbtack"></i></button>
                    </div>
                    <button @click="toggleColorBtn()" class="note-editor-btn"><i class="fa-solid fa-palette"></i></button>
                    <div v-if="colorBtnSelected" class="note-color-selector">
                        <span @click="changeStyle(note.id, color)" class="note-color" v-for="color in colors" :style="{ 'background-color': color }">Co</span>
                    </div>
                    <button @click="shareToMail(note.id)" class="note-editor-btn"><i class="fa-solid fa-envelope"></i></button>
                    <router-link :to="'/note/' + note.id">
                        <button @click="toggleEditModal" class="note-editor-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                    </router-link>
                        <div v-if="noteSelected">
                            <note-edit @closeModal="toggleEditModal" :note="note"/>
                        </div>
                    <button @click="removeNote(note.id)" class="note-editor-btn"><i class="fa-solid fa-trash"></i></button>
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
            noteSelected: false,
            colorBtnSelected: false,
            colors: ['transparent', '#49caae','#3296e1','#9957bb', '#344860', '#54be76', '#f1c500', '#eb705e', '#c13a24', '#ebeff0'],
        }
    },
    methods: {
        toggleEditModal() {
            this.noteSelected = !this.noteSelected
        },
        // closeEditModal() {
        //     this.noteSelected = false
        // },
        toggleColorBtn() {
            this.colorBtnSelected = !this.colorBtnSelected
        },
        removeNote(noteId) {
            this.$parent.$emit('remove', noteId)
        },
        pinNote(noteId) {
            this.$parent.$emit('pin', noteId)
        },
        changeStyle(noteId, color) {
            this.$parent.$emit('changeStyle', noteId, color)
        },
        shareToMail(noteId) {
            this.$parent.$emit('share', noteId)
        },
        editNote(noteId) {
            this.$parent.$emit('edit', noteId)
        }      
    },
    components: {
        noteImg,
        noteTxt,
        noteVideo,
        noteTodos,
        noteEdit,
    }
}
