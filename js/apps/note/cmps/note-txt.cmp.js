export default {
    props: ['info'],
    template: `
        <section class=note-txt>
            <h2>{{info.title}}</h2>
            <p>{{info.txt}}</p>
        </section>
    `,
}