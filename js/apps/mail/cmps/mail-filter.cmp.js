import { eventBus } from "../../../general/services/event-bus.service.js"

export default {
    name: 'mail-filter',

    template: `
        <section class="mail-filter flex">
            <button class="main-sidenav-close" @click="toggleMenu">☰</button>
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
            <button :disabled="pageIdx <= 0" @click="navPage(-1)"><i :class="disablePrev" class="page-nav-btn fa-solid fa-caret-left"></i></button>
            <button :disabled="pageIdx >= 1" @click="navPage(1)"><i  :class="disableNext" class="page-nav-btn fa-solid fa-caret-right"></i></button>

            
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
            },
            pageIdx: 0,
            
        }
    },
    computed: {
        disablePrev(){
            if(this.pageIdx <= 0) return 'disabled'
        },
        disableNext(){
            if(this.pageIdx >= 1) return 'disabled'
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
        },
        toggleMenu(){
            document.body.classList.toggle('menu-open')
            eventBus.emit('toggleMenu')
            console.log('ho')
        },
        navPage(dif){
            this.pageIdx += dif
            this.$emit('pageNav', this.pageIdx)
        }
    },
    created(){
        eventBus.on('filterType', this.type)
        eventBus.on('toggleSideNav', this.toggleMenu)
    },
}