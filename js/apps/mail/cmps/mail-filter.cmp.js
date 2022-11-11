import { eventBus } from "../../../general/services/event-bus.service.js"

export default {
    name: 'mail-filter',

    template: `
        <section class="mail-filter flex">

            <input type="search" 
                   v-model="filterBy.subject"
                   @input="filter"
                   placeholder="🔍search"  />

            <button v-if="!filterBy.isRead" @click="filterBy.isRead = !filterBy.isRead;filter();" class="mail-filter-read-btn"><i class="fa-regular fa-envelope"></i></button>
            <button v-if="filterBy.isRead" @click="filterBy.isRead = !filterBy.isRead;filter();" class="mail-filter-read-btn"><i class="fa-regular fa-envelope-open"></i></button>
           
            <button v-if="filterBy.isStar" @click="filterBy.isStar = !filterBy.isStar;filter();" class="mail-filter-read-btn"><i class="fa-solid fa-star"></i></button>
            <button v-if="!filterBy.isStar" @click="filterBy.isStar = !filterBy.isStar;filter();" class="mail-filter-read-btn"><i class="fa-regular fa-star"></i></button>

            <button @click="refresh"><i class="fa-solid fa-arrows-rotate"></i></button>
            <button><i class="fa-solid fa-caret-left"></i></button>
            <button><i class="fa-solid fa-caret-right"></i></button>
        </section>
    `,
    data() {
        return{
            
            filterBy: {
                subject: '',
                type:'inbox',
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