import { eventBus } from "../../../general/services/event-bus.service.js"

export default {
    name: 'mail-filter',

    template: `
        <section class="mail-filter">

            <input type="search" 
                   v-model="filterBy.subject"
                   @input="filter"  />

            <button @click="filterBy.isRead = !filterBy.isRead;filter();" class="mail-filter-read-btn">read</button>
            <button @click="filterBy.isStar = !filterBy.isStar;filter();" class="mail-filter-read-btn">Star</button>

            <button @click="refresh">refresh</button>
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
            console.log(this.filterBy)
            this.$emit('mailFilter', this.filterBy)
        },
        type(type){
            this.filterBy.type = type
            this.$emit('mailFilter', this.filterBy)
        },
        refresh(){
            location.reload()
        }
    },
    created(){
        eventBus.on('filterType', this.type)
    },
}