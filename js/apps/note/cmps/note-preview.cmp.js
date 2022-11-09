

export default {
    props: ['note'],
    template: `
        <section class="note-preview">
            <div class="note">
                <p>{{note.info.txt}}</p>
            </div>
        </section>
    `,
}