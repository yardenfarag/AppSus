export default {
    props: ['info'],
    template: `
            <section class="note-img">
            <img :src="info.imgUrl">
            <p>{{info.txt}}</p>
            </section>
    `,
}