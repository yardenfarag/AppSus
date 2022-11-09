

export default {
    name: ['note-preview'],
    props: ['note'],
    template: `
        <section class="note-preview">
            <div class="note">
                <p>{{note.info.txt}}</p>
                <!-- <img v-if="note.info.imgName" src="renderImg" alt="" /> -->
                <ul class="note-todos">
                    <li v-if="note.todos" v-for="txt in note.todos.txt">{{txt}}</li>
                </ul>
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
    // computed: {
    //     renderImg() {
    //         return `../../../../assets/img/note/${this.note.info.imgName}.jpeg`
    //     }
    // }
}
