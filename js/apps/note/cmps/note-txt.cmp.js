export default {
    props: ['info'],
    template: `
        <section class=note-txt>
            <p>{{info.title}}</p>
            <p>{{info.txt}}</p>
        </section>
    `,
}