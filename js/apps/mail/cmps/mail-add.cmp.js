import { eventBus } from "../../../general/services/event-bus.service.js"
import { mailService } from "../services/mail-service.js"

export default {
    emits: ['mailAdded'],
    name: 'mail-add',
    template: `
    
        <section class="add-mail-main ">
        <i @click="close" class="mail-close-details fa-solid fa-arrow-left"></i>
            <form class="mail-form flex">
                <input required  class="mail-input" type="text" v-model="mailDraft.to" placeholder="for who?"/>
                <input class="mail-input" type="text" v-model="mailDraft.subject" placeholder="Subject"/>
                <textarea class="mail-input-body" placeholder="Enter your mail here =]" name="body" v-model="mailDraft.body" id="" rows="20"></textarea>
                <i title="send" @click.prevent="save" class="mail-close-details fa-solid fa-paper-plane mail-send"></i>
            </form>

        </section>
    `,
    data(){
        return{
            mailDraft: mailService.getEmptyMail(),     
        }
    },
    methods:{
        close(){
            eventBus.emit('addMail', false)
            this.$parent.$emit('mailAdded', this.mailDraft)
        },
        save(){
            this.mailDraft.type = 'sent'
            this.$parent.$emit('mailAdded', this.mailDraft)
            eventBus.emit('addMail', false)
        }
      
    }
}