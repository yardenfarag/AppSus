import { mailService } from '../services/mail-service.js'
import { eventBus } from '../../../general/services/event-bus.service.js'

import mailList from '../cmps/mail-list.cmp.js'
import mailSideNav from '../cmps/mail-side-nav.cmp.js'



export default {
    name: 'mail-app',
    template: `
            <section class="mail-app">

            

            <section class="mail-main-container flex">

                <mail-side-nav :mailsData="mailsData"/>

                <mail-list v-if="mailsData"
                           :mailsData="mailsData"
                           @remove="removeMail"
                           @mailAdded="save"
                           @read="save"
                           />
            </section>

            </section>
    `,
    data() {
        return {
            mailsData: null,
         
        }
    },
    methods: {
        removeMail(mailId){
            console.log('removing?')
            mailService.remove(mailId)
                .then(() => {
                    const idx = this.mailsData.findIndex(mail => mail.id === mailId)
                    this.mailsData.splice(idx, 1)
                    // showSuccessMsg(`Car ${mailId} deleted`)
                })
                .catch(err =>{
                    console.log('OOPS', err)
                    // showErrorMsg('Cannot remove mail')
                })
        },
        save(mail){

            mailService.save(mail)
                .then((mail) => {

                    const idx = this.mailsData.findIndex(existMail => existMail.id === mail.id)

                    if(idx !== -1) return 
                    this.mailsData.unshift(mail)
                    // showSuccessMsg(`mail saved (mail id: ${mail.id})`
                })
                .catch(err => {
                    console.log('OOps:', err)
                    // showErrorMsg(`Cannot save mail`)
                })
                
        },

    },
    computed: {
        mailLoad(){
            console.log(this.mailsData)
            return this.mailsData
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
       eventBus.on('mailAdded', this.start)
    },
}