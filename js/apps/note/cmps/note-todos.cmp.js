export default {
    props: ['info'],
    template: `
        <section class="note-todos">
           <p>{{info.txt}}</p>

                <div v-for="todo in info.todos">
                    <label class="checkbox">
                        <input type="checkbox" value="todo"/>
                        <span>{{todo}}</span>
                    </label>
                </div>

        </section>
    `,

}