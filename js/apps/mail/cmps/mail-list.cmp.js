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

            <section v-if="showList" class="mail-main-list">
            <mail-filter @mailFilter="setFilter"
                         @pageNav = "pageNav"/>
    
                <article class="mail-card"
                        
                        v-for="mail in mailsToShow" 
                        :key="mail.id">
                
                        <mail-preview @details="openDetails" :mail="mail"/>
                        
                    </article>
                </section>

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
            pageIdx: 0,
            mailInPage: 18,
        }
    },

    computed: {

        mailsToShow() {

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
                    mails = mails.sort(function (a, b) {
                        if (a.sendAt < b.sendAt) {
                            return -1
                        }
                        if (a.sendAt > b.sendAt) {
                            return 1
                        }
                        return 0
                    })
                }
                if(this.filterBy.sortBy === 'alpha'){

                    mails = mails.sort(function (a, b) {
                        if (a.subject < b.subject) {
                            return -1
                        }
                        if (a.subject > b.subject) {
                            return 1
                        }
                        return 0
                    })
                }
            }
            if(this.pageIdx === 1)mails = mails.splice(this.pageIdx, this.mailInPage)
            else mails = mails.splice((this.pageIdx*this.mailInPage), this.mailInPage)

            return mails
        },

    },
    methods: {
        setFilter(filterParams) {
            this.filterBy = filterParams
        },
        mailAdd() {
            this.showAdd = !this.showAdd
            console.log(this.showAdd)
        },
        openDetails(mail) {
            this.detailsOfMail = mail
            this.showList = !this.showList
            this.showDetails = !this.showDetails
        },
        noteToMail(note){
            console.log(note)
        },
        pageNav(pageIdx){
            this.pageIdx = pageIdx
        }

    },
    created() {
        eventBus.on('addMail', this.mailAdd)
        eventBus.on('noteToMail', note => {
            this.noteToMail(note)
            
        })
    },
    components: {
        mailAdd,
        mailDetails,
        mailPreview,
        mailFilter,
    },
 
}