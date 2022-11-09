import { noteService } from "../services/note.service.js"
import { eventBus } from '../../../general/services/event-bus.service.js'

import noteTxt from '../cmps/note-txt.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'

export default {
    name: ['note-preview'],
    props: ['note'],
    template: `
        <section class="note-preview">
            <div class="note">
                <div className="note-editor">
                    <button  @click.stop.prevent="removeNote" class="note-editor-btn">📌</button>
                    <button class="note-editor-btn">🌈</button>
                    <button class="note-editor-btn">✉️</button>
                    <button class="note-editor-btn">📝</button>
                    <button class="note-editor-btn">✖️</button>
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
    created() {
        console.log(this.note.info.url)
    },
    methods: {
        removeNote() {
            noteService.removeNote(this.note.id)
                .then(note => {
                    eventBus.showSuccessMsg('Note Removed Successfully!')
                })
                .catch(note => 
                    {eventBus.showErrorMsg('Something Went Wrong...')})
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
