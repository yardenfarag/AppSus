export default {
    props: ['info'],
    template: `
        <section class="note-video">
            <p>{{info.txt}}</p>
            <iframe :src="info.vidUrl" frameborder="0"></iframe>
        </section>
    `,
}