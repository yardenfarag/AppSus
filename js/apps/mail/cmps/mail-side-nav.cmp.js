import { eventBus } from '../../../general/services/event-bus.service.js'

export default {
    name: 'mail-side-nav',
    emits: ['mailAdded'],
    props: ['mailsData'],
    template: `
    <section v-if="mailsData" class="mail-side-nav">

    <button class="add-mail-btn" @click="addMail">new mail  <i class="fa-solid fa-pen"></i></button>

        <ul class="clean-list side-nav-list">
            <li class="mail-side-nav-category flex" @click="inbox"> <i class="fa-solid fa-inbox"></i>Inbox <span>{{ inboxCalc }}</span></li>
            <li class="mail-side-nav-category flex" @click="star"><i class="fa-solid fa-star"></i>Star <span>{{ starCalc }}</span></li>
            <li class="mail-side-nav-category flex" @click="sent"><i class="fa-sharp fa-solid fa-arrow-up-from-bracket"></i>Sent <span>{{ sentCalc }}</span></li>
            <li class="mail-side-nav-category flex" @click="draft"><i class="fa-regular fa-file"></i>Drafts <span>{{ draftCalc }}</span></li>
            <li class="mail-side-nav-category flex" @click="trash"><i class="fa-solid fa-trash-can"></i>Trash <span>{{ trashCalc }}</span></li>
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
        starCalc(){
            var star = 0
            for(let i =0; i < this.mailsData.length; i++){
                if(this.mailsData[i].isStar) star++
            }
            return star
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