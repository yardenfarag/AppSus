export default {
    props: ['info'],
    template: `
            <section class="note-img">
            <img :src="renderImg">
            <p>{{info.txt}}</p>
            </section>
    `,
    computed: {
        renderImg() {
            return `../../../../../assets/img/note/${this.info.imgName}.jpeg`
        }
    }
}