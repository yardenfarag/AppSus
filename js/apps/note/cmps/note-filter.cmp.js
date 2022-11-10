import { eventBus } from "../../../general/services/event-bus.service.js"

export default {
    template: `
        <section className="note-filter">
            <input 
            @input="filter"
            v-model="filterBy.txt" 
            type="search" 
            placeholder="Search for a Note" />
        </section>
    `,
    data() {
        return {
            filterBy: {
                txt: ''
            }
        }
    },
    methods: {
        filter() {
            eventBus.emit('filter', this.filterBy)
        }
    },
}