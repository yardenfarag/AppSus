
export default {
    template: `
        <section class="book-filter">
            <input 
            @input="filter"
            v-model="filterBy.title"
            type="text"
            placeholder="Search"
            /> From Price
            <input
            @input="filter"
            v-model="filterBy.fromPrice"
            type="number"
            /> To Price
            <input 
            @input="filter"
            v-model="filterBy.toPrice"
            type="number"
            />
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: -Infinity,
                toPrice: Infinity,
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy)
        }
    }
}