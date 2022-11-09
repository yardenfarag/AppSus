import { eventBus } from "../../../general/services/event-bus.service.js"
import { mailService } from "../services/mail-service.js"

export default {
    emits: ['mailAdded'],
    name: 'mail-add',
    template: `
    
        <section class="add-mail-main">
            <button @click="close">X</button>
            <form @submit.prevent="save">
                <input type="text" v-model="mailDraft.to" placeholder="for who?"/>
                <input type="text" v-model="mailDraft.subject" placeholder="Subject"/>
                <textarea name="body" v-model="mailDraft.body" id="" cols="30" rows="10"></textarea>
                <button>send</button>
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
        },
        save(){
            this.$parent.$emit('mailAdded', this.mailDraft)
            eventBus.emit('addMail', false)
        }
      
    }
}