export default {
    props: ['info'],
    template: `
        <section class="note-todos">
           <h5>{{info.txt}}</h5>

                <div v-for="todo in info.todos">
                    <label>
                        <input type="checkbox" value="todo.txt"/> {{todo.txt}}
                            <span v-if="todo.doneAt">{{formatTime(todo.doneAt)}}</span>
                    </label>
</div>

        </section>
    `,
    methods: {
        formatTime(time) {
            return new Date(time).toLocaleDateString()
        }
    },
}