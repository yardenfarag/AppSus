export default {
    props: ['info'],
    template: `
        <section class=note-txt>
            <h3>{{info.title}}</h3>
            <p>{{info.txt}}</p>
        </section>
    `,
}