import { eventBus } from "../../../general/services/event-bus.service.js"

export default {
    template: `
        <section className="note-filter">
            <input 
            @input="filter"
            v-model="filterBy.txt" 
            type="search" 
            placeholder="Search for a Note" />

            <select @input="type" v-model="filterBy.type">
                <option value="">All Notes</option>
                <option value="note-txt">Text Notes</option>
                <option value="note-img">Image Notes</option>
                <option value="note-video">VIdeo Notes</option>
                <option value="note-todos">Todos Notes</option>
                <option value="note-audio">Audio Notes</option>
            </select>
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                type: '',
            }
        }
    },
    methods: {
        filter() {
            eventBus.emit('filter', this.filterBy)
        },
        type() {
            console.log(this.filterBy);
            eventBus.emit('filter', this.filterBy)
        },
    },
}