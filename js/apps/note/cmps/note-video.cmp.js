export default {
    props: ['info'],
    template: `
        <section class="note-video">
            <h2>{{info.txt}}</h2>
            <iframe :src="info.vidUrl" frameborder="0"></iframe>
        </section>
    `,
}