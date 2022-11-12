import mailAdd from '../cmps/mail-add.cmp.js'
import mailPreview from '../cmps/mail-preview.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'
import { eventBus } from '../../../general/services/event-bus.service.js'


export default {
    name: 'mail-list',
    emits: ["remove", "mailAdded", "read"],
    props: ['mailsData'],
    template: `


    <mail-add v-if="showAdd" />
    <mail-details @details="openDetails" v-if="showDetails" :mail="detailsOfMail"/>

        <!-- <div class="list-bg"> -->
            <section v-if="showList" class="mail-main-list">
            <mail-filter @mailFilter="setFilter"/>
    
                <article class="mail-card"
                        
                        v-for="mail in mailsToShow" 
                        :key="mail.id">
                
                        <mail-preview @details="openDetails" :mail="mail"/>
                        
                    </article>
                </section>

        <!-- </div> -->
            

    `,
    data() {
        return {
            showList: true,
            showAdd: false,
            showDetails: false,
            detailsOfMail: {},
            mails: this.mailsData,
            filterBy: {
                subject: '',
                type: 'inbox',
                isRead: false,
                isStar: false,
                // sortBy: '',
            },


        }
    },
    computed: {
        mailsToShow() {
            console.log(this.filterBy)
            const regex = new RegExp(this.filterBy.subject, 'i')
            var mails = this.mails.filter(mail => regex.test(mail.subject))

            if (this.filterBy.type) {
                mails = mails.filter(mail => mail.type === this.filterBy.type)
            }
            if (this.filterBy.isRead) {
                mails = mails.filter(mail => mail.isRead === !this.filterBy.isRead)
            }
            if (this.filterBy.isStar) {
                mails = mails.filter(mail => mail.isStar === this.filterBy.isStar)
            }
            if (this.filterBy.sortBy){
                if(this.filterBy.sortBy === 'date'){
                    console.log(this.filterBy.sortBy)
                   mails.sort((a,b) => a.sendAt > b.sendAt) 
                }
                if(this.filterBy.sortBy === 'alpha'){
                    mails.sort((a,b) => a.subject > b.subject) 
                }
            }

            return mails
        },

    },
    methods: {
        setFilter(filterParams) {
            this.filterBy = filterParams
        },
        mailAdd() {
            this.showAdd = !this.showAdd
        },
        openDetails(mail) {
            this.detailsOfMail = mail
            this.showList = !this.showList
            this.showDetails = !this.showDetails
        },

    },
    created() {
        eventBus.on('addMail', this.mailAdd)
    },
    components: {
        mailAdd,
        mailDetails,
        mailPreview,
        mailFilter,
    },
}