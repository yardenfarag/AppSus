export default {
    name: 'mail-filter',

    template: `
        <section class="mail-filter">

            <input type="search" 
                   v-model="filterBy.subject"
                   @input="filter"  />

            <button @click="filterBy.isRead = !filterBy.isRead;filter();" class="mail-filter-read-btn">read</button>
            <button @click="filterBy.isStar = !filterBy.isStar;filter();" class="mail-filter-read-btn">Star</button>

            <button>refresh</button>
            <button>prev-nav</button>
            <button>next-nav</button>
        </section>
    `,
    data() {
        return{
            filterBy: {
                subject: '',
                type:'',
                isRead: false,
                isStar: false,
            }
        }
    },
    methods : {
        filter(){
            this.$emit('mailFilter', this.filterBy)
        }
    },
}