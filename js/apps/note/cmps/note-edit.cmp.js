import { noteService } from '../services/note.service.js'


import noteTxtEdit from '../cmps/note-txt-edit.cmp.js'
import noteImgEdit from '../cmps/note-img-edit.cmp.js'
import noteVideoEdit from '../cmps/note-video-edit.cmp.js'
import noteTodosEdit from '../cmps/note-todos-edit.cmp.js'

export default {
    name: 'note-edit',
    props: ['note'],
    template: `
        <section class="note-edit-modal">
        <div :style="{backgroundColor: note.style.backgroundColor}" class="note">
                <form @submit.prevent="save">
                    <input type="text" v-model="noteToEdit.info.txt" />
                    <button>Save</button>
                </form>
            </div>
        </section>
    `,
    data() {
        return {
            noteToEdit: noteService.getEmptyNote(),
            colorBtnSelected: false,
            colors: ['transparent', '#49caae','#3296e1','#9957bb', '#344860', '#54be76', '#f1c500', '#eb705e', '#c13a24', '#ebeff0'],
        }
    },
      methods: {
        save() {
            console.log('savig...');
        },
        toggleNoteEdit() {
            this.noteSelected = !this.noteSelected
            console.log(this.noteSelected);
        },
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
    }, components: {
        noteTxtEdit,
        noteImgEdit,
        noteVideoEdit,
        noteTodosEdit,
        
    }
}