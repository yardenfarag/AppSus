import { noteService } from "../services/note.service.js"

export default {
    name: 'note-add',
    emits: ['save'],
    template: `
        <section>
            <form @submit.stop.prevent="saveNote(noteToEdit)" class="note-add" >
                <div className="inputs">
                    <input type="text" :placeholder="placeholder" v-model="noteToEdit.info.txt" autofocus/>
                    <input :class="['secondary', showClass]" type="text" :placeholder="typePlaceholder" v-model="info" autofocus/>
                    <div :class="['note-upload', showImgUpload]">
                        <p>or</p>
                        <input @change="setUploadImgae($event,i)" style="display: none;" ref="imgFile" type="file"/>
                        <button @click.prevent.stop="$refs.imgFile.click()" class="note-btn">Upload</button>
                    </div>
                    <div :class="['note-upload', showVideoUpload]">
                        <p>or</p>
                        <input @change="setUploadVideo($event,i)" style="display: none;" ref="vidFile" type="file"/>
                        <button @click.prevent.stop="$refs.vidFile.click()" class="note-btn">Upload</button>
                    </div>
                    <div :class="['note-upload', recorder, showRecorder]">
                        <p>or record your own</p>
                        <div className="record-btns">
                            <button @click.prevent.stop="recordAudio()" :class="['note-btn', 'start', recording]"><i class="fa-solid fa-circle-play"></i></button>
                            <button @click.prevent.stop="stopRecording()" class="note-btn stop"><i class="fa-solid fa-circle-stop"></i></button>
                        </div>    
                    </div>
                </div>
                <div class="note-types">
                    <button @click.stop.prevent="noteToEditType('note-txt')" title="Text"><i class="fa-solid fa-font"></i></button>
                    <button @click.stop.prevent="noteToEditType('note-img')" title="Image"><i class="fa-solid fa-image"></i></button>
                    <button @click.stop.prevent="noteToEditType('note-video')" title="Video"><i class="fa-brands fa-youtube"></i></button>
                    <button @click.stop.prevent="noteToEditType('note-todos')" title="Todos"><i class="fa-solid fa-square-check"></i></button>
                    <button @click.stop.prevent="noteToEditType('note-audio')" title="Audio"><i class="fa-solid fa-file-audio"></i></button>
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
            isRecordBtnShow: false,
            UploadImageBtn: false,
            info: '',
            image: new Array(5),
            i: '',
            video: new Array(5),
            audio: '',
            upload: '',
            record: '',
            recorder: null,
            items: [],
            loadImg: false,
            loadVideo: false,
            recordBtns: false,
            isRecording: false,
        }
    },
    created() {
    },
    methods: {
        recordingIndication() {
            this.isRecording = !this.isRecording
        },
        recordAudio() {
            let device = navigator.mediaDevices.getUserMedia({ audio: true })
            device.then((stream) => {
                this.recorder = new MediaRecorder(stream)
                this.recorder.ondataavailable = (ev) => {
                    this.items.push(ev.data)
                }
                this.recorder.start()
                this.recordingIndication()
            })

        },
        stopRecording() {
            this.recorder.stop()
            this.recordingIndication()
            setTimeout(() => { 
                let blob = new Blob(this.items, { type: 'audio/*' })
                this.audio = URL.createObjectURL(blob)
                this.info = this.audio
            }, 1000);
        },
        setUploadVideo(ev, i) {
            console.log(ev);
            let files = ev.target.files
            if (!files) return
            this.video.splice(i, 0, URL.createObjectURL(files[0]))
            this.video = JSON.parse(JSON.stringify(this.video))[0]
            this.info = this.video
        },
        setUploadImgae(ev, i) {
            let files = ev.target.files
            if (!files.length) return
            this.image.splice(i, 0, URL.createObjectURL(files[0]))
            this.image = JSON.parse(JSON.stringify(this.image))[0]
            this.info = this.image
        },
        displayImgUpload() {
            this.loadImg = true
            this.loadVideo = false
            this.recordBtns = false
        },
        displayVideoUpload() {
            this.loadVideo = true
            this.loadImg = false
            this.recordBtns = false
        },
        displayrecordBtns() {
            this.recordBtns = true
            this.loadVideo = false
            this.loadImg = false
        },
        hideAllExtras() {
            this.recordBtns = false
            this.loadVideo = false
            this.loadImg = false
        },
        noteToEditType(type) {
                this.isSecondInputShow = true
            if (type === 'note-txt') {
                this.isSecondInputShow = false
                this.hideAllExtras()
                this.noteInfoProp = 'txt'
                this.placeholder = "Type Somthing Here..."
            }
            if (type === 'note-img') {
                this.displayImgUpload()
                this.UploadImageBtn = true
                this.noteInfoProp = 'imgUrl'
                this.noteToEdit.info[this.noteInfoProp] = ''
                this.typePlaceholder = "Paste Your Image URL Here..."
            }
            if (type === 'note-video') {
                this.displayVideoUpload()
                this.noteInfoProp = 'vidUrl'
                this.noteToEdit.info[this.noteInfoProp] = ''
                this.typePlaceholder = "Paste Your (Embed) Video URL Here..."
            }
            if (type === 'note-todos') {
                this.hideAllExtras()
                this.noteInfoProp = 'todos'
                this.noteToEdit.info[this.noteInfoProp] = []
                this.typePlaceholder = "List Your Todos Separated By Commas"
            }
            if (type === 'note-audio') {
                this.displayrecordBtns()
                this.noteInfoProp = 'audUrl'
                this.noteToEdit.info[this.noteInfoProp] = ''
                this.typePlaceholder = "Paste Your Audio URL here..."
            }
            this.noteToEdit.type = type
        },
        saveNote(noteToEdit) {
            if (noteToEdit.type !== 'note-txt') {
                noteToEdit.info[this.noteInfoProp] = this.info
            }
            if (noteToEdit.type === 'note-txt' && !noteToEdit.info.txt 
            || noteToEdit.type === 'note-img' && !noteToEdit.info.imgUrl 
            || noteToEdit.type === 'note-video' && !noteToEdit.info.vidUrl 
            || noteToEdit.type === 'note-todos' && !noteToEdit.info.todos 
            || noteToEdit.type === 'note-audio' && !noteToEdit.info.audUrl){
                this.isSecondInputShow = false
                this.hideAllExtras()
                return
            }
            const note = JSON.parse(JSON.stringify(noteToEdit))
            if (note.type === 'note-todos') {
                let todos = note.info.todos.split(',')
                note.info.todos = todos
            }
            console.log(note);
            this.$emit('save', note)
            this.typePlaceholder = ''
            this.noteToEdit.info.txt = ''
            this.info = ''
            this.isSecondInputShow = false
            this.hideAllExtras()
        },
    },
    computed: {
        note() {
            return this.noteToEdit.info[this.noteInfoProp]
        },
        showClass() {
            if (this.isSecondInputShow) return 'show'
        },
        showImgUpload() {
            if (this.loadImg) return 'show-img-upload'
        },
        showVideoUpload() {
            if (this.loadVideo) return 'show-video-upload'
        },
        showRecorder() {
            if (this.recordBtns) return 'show-recorder'
        },
        recording() {
            if (this.isRecording) return 'play'
        }
    }
}