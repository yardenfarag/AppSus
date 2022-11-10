import { eventBus } from '../../../general/services/event-bus.service.js'

export default {
    name: 'mail-side-nav',
    emits: ['mailAdded'],
    props: ['mailsData'],
    template: `
    <section v-if="mailsData" class="mail-side-nav">

    <button class="add-mail-btn" @click="addMail">new mail <i class="fa-solid fa-pen"></i></button>

        <ul class="clean-list">
            <li class="mail-side-nav-category" @click="inbox">inbox {{ inboxCalc }}</li>
            <li class="mail-side-nav-category" @click="sent">sent {{ sentCalc }}</li>
            <li class="mail-side-nav-category" @click="draft">drafts {{ draftCalc }}</li>
            <li class="mail-side-nav-category" @click="trash">trash {{ trashCalc }}</li>
        </ul>
    </section>
    `,
    data(){
        return{
            counters: null,
        }
    },
    computed:{
        inboxCalc(){
            var inbox = 0
            for(let i =0; i < this.mailsData.length; i++){
                if(this.mailsData[i].type === 'inbox' && !this.mailsData[i].isRead) inbox++
            }
            return inbox
        },
        sentCalc(){
            var sent = 0
            for(let i =0; i < this.mailsData.length; i++){
                if(this.mailsData[i].type === 'sent') sent++
            }
            return sent
        },
        draftCalc(){
            var draft = 0
            for(let i =0; i < this.mailsData.length; i++){
                if(this.mailsData[i].type === 'draft') draft++
            }
            return draft
        },
        trashCalc(){
            var trash = 0
            for(let i =0; i < this.mailsData.length; i++){
                if(this.mailsData[i].type === 'trash') trash++
            }
            return trash
        },

    },
    methods: {
        addMail() {
            eventBus.emit('addMail', true)
        },
        inbox(){
            eventBus.emit('filterType', 'inbox')
        },
        sent(){
            eventBus.emit('filterType', 'sent')
        },
        draft(){
            eventBus.emit('filterType', 'draft')
        },
        trash(){
            eventBus.emit('filterType', 'trash')
        },
    },
}