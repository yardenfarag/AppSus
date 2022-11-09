import { mailService } from '../services/mail-service.js'


import mailList from '../cmps/mail-list.cmp.js'
import mailSideNav from '../cmps/mail-side-nav.cmp.js'


export default {
    template: `
            <section class="mail-app">

            

            <section class="mail-main-container flex">

                <mail-side-nav />

                <mail-list v-if="mailsData" :mailsData="mailsData"/>
            </section>

            </section>
    `,
    data() {
        return {
            mailsData: null,
         
        }
    },
    components: {
        
        mailList,
        mailSideNav,
    },
    created() {
        mailService.query().then(mails => { 
            this.mailsData = mails 
        })
    },
 

    unmounted() { },
}