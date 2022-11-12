import { eventBus } from '../../../general/services/event-bus.service.js'

import noteTxtEdit from '../cmps/note-txt-edit.cmp.js'
import noteImgEdit from '../cmps/note-img-edit.cmp.js'
import noteVideoEdit from '../cmps/note-video-edit.cmp.js'
import noteTodosEdit from '../cmps/note-todos-edit.cmp.js'

export default {
    name: 'note-edit',
    props: ['note'],
    template: `
        <section :style="{backgroundColor: note.style.backgroundColor}" class="note-edit-modal">
        <div class="note">
                <form @submit.stop.prevent="saveNote">
                    <p v-if="noteToEdit.type === 'note-txt'">Note Title</p><input v-if="noteToEdit.type === 'note-txt'" type="text" v-model="noteToEdit.info.title" autofocus/>
                    <p>Note Text</p><textarea type="text" v-model="noteToEdit.info.txt" autofocus/>
                    <p v-if="noteToEdit.info.imgUrl">Note Image Url</p> <input v-if="noteToEdit.info.imgUrl" type="text" v-model="noteToEdit.info.imgUrl"/>
                    <p v-if="noteToEdit.info.vidUrl">Note Video Url</p> <input v-if="noteToEdit.info.vidUrl" type="text" v-model="noteToEdit.info.vidUrl" />
                    <p v-if="noteToEdit.info.todos">Note Todos</p> <input v-if="noteToEdit.info.todos" type="text" v-model="noteToEdit.info.todos" />
                    <p v-if="noteToEdit.info.audUrl">Note Audio Url</p> <input v-if="noteToEdit.info.audUrl" type="text" v-model="noteToEdit.info.audUrl" />
                    <router-link to="/note">
                        <button @click="toggleNoteEdit();saveNote(noteToEdit)" class="note-btn">Save</button>
                    </router-link>
                </form>
            </div>
        </section>
    `,
    data() {
        return {
            noteToEdit: this.note,
            colorBtnSelected: false,
            colors: ['transparent', '#49caae','#3296e1','#9957bb', '#344860', '#54be76', '#f1c500', '#eb705e', '#c13a24', '#ebeff0'],
        }
    },
      methods: {
        saveNote(note) {
            eventBus.emit('saveNote', note)
            this.$router.push('/note/')
        },
        toggleNoteEdit() {
            this.$emit('closeModal')
            this.$router.push('/note/')
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