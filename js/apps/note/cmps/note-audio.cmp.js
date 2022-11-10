export default {
    props: ['info'],
    template: `
        <section class="note-audio">
            <p>{{info.txt}}</p>
            <audio :src="info.audUrl"></audio>
        </section>
    `,
}