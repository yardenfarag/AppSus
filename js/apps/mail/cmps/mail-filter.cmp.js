import { eventBus } from "../../../general/services/event-bus.service.js"

export default {
    name: 'mail-filter',

    template: `
        <section class="mail-filter flex">

            <input type="search" 
                   v-model="filterBy.subject"
                   @input="filter"
                   placeholder="🔍search"  />

            <button  @click="sortMails('date')" class="mail-filter-clock-btn"><i class="fa-solid fa-clock"></i></button>
            <button  @click="sortMails('alpha')" class="mail-filter-title-btn"><i class="fa-solid fa-arrow-down-a-z"></i></button>
            
            
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
                sortBy: '',
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
        },
        sortMails(val){
            this.filterBy.sortBy = val
            console.log( this.filterBy.sortBy)
            this.$emit('mailFilter', this.filterBy)
        }
    },
    created(){
        eventBus.on('filterType', this.type)
    },
}