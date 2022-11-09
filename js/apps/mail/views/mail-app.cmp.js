import { mailService } from '../services/mail-service.js'

import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailSideNav from '../cmps/mail-side-nav.cmp.js'


export default {
    template: `
            <section class="mail-app">

            <mail-filter @mailFilter="setFilter"/>

            <section class="mail-main-container flex">

                <mail-side-nav />

                <mail-list v-if="mails" :mails="mailsToShow"/>
                

            </section>



            </section>
    `,
    data() {
        return {
            mails: null,
            filterBy: {
                subject: '',
                type:'',
                isRead: false,
                isStar: false,
            }
        }
    },
    components: {
        mailFilter,
        mailList,
        mailSideNav,
    },
    created() {
        mailService.query().then(mails => { 
            this.mails = mails 
            console.log(this.mails)
        })
    },
    methods: {
        setFilter(filterParams){
            this.filterBy = filterParams
            
        }
    },
    computed: {
        mailsToShow(){
            const regex = new RegExp(this.filterBy.subject, 'i')
            var mails = this.mails.filter(mail => regex.test(mail.subject))
            if(this.filterBy.isRead){
                mails.filter(mail => mail.isRead === this.filterBy.isRead)
                console.log(mails)
                console.log(this.filterBy.isRead)
            } 
            return mails
            
        }
    },
    unmounted() { },
}