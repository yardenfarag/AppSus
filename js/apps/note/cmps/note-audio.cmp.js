export default {
    props: ['info'],
    template: `
        <section class="note-audio">
            <p>{{info.txt}}</p>
            <audio controls :src="info.audUrl"></audio>
        </section>
    `,
}