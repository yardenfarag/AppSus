export default {
    props: ['info'],
    template: `
        <section class="note-audio">
            <p>{{info.txt}}</p>
            <canvas></canvas>
        </section>
    `,
}