

export default {
    inheritAttrs: false,
    name: 'mail-preview',
    props: ['mail'],
    emits: ['remove', 'details', 'read'],
    template: `
    <section class="main-mail-preview" :class="mailIsRead">
        <section v-on:mouseover="hoverButtensOn" v-on:mouseleave="hoverButtensOff"  class="mail-preview flex">
            <router-link :to="'/mail/' + mail.id">         
                <section  class="mail-card-content flex">
                    
                <button v-if="mail.isStar" class="card-button" @click="star(mail)" :class="starClass"><i class="fa-solid fa-star"></i></button>
                <button v-if="!mail.isStar" class="card-button" @click="star(mail)" :class="starClass"><i class="fa-regular fa-star"></i></button>
                    <section class="mail-card-content flex" @click="details(mail)">
                        <h5 class="mail-from" :class="mailIsRead">{{ mail.from }}</h5>

                        <div >
                            <h4 class="mail-subject" :class="mailIsRead">{{ mail.subject }}</h4>
                        </div>
                        
                            <div >
                                <p class="mail-body-prev">{{ mail.body }}</p>
                            </div>
                    </section>
                </section>    
            </router-link>
            <div class="mail-date flex">

                </div>
                <section v-if="isHoverd" class="mail-preview-buttens flex">
                    <button class="card-button" @click="remove(mail.id)"><i class="fa-solid fa-trash-can"></i></button>
                    
                    <button v-if="mail.isRead" class="card-button" @click="read(mail)" :class="readClass" ><i class="fa-regular fa-envelope-open"></i></button>
                    <button v-if="!mail.isRead" class="card-button" @click="read(mail)" :class="readClass" ><i class="fa-regular fa-envelope"></i></button>
                </section>
                
                <h6 class="mail-date">{{ dateCalc }}</h6>
        </section>
    </section>
    `,
    data() {
        return {
            isHoverd: false,
        }
    },
    computed: {
        readClass() {
            return { readClassRed: this.mail.isRead, readClassblue: !this.mail.isRead, }
        },
        starClass() {
            return { readClassRed: this.mail.isStar, readClassblue: !this.mail.isStar, }
        },
        dateCalc() {
            return new Date(this.mail.sentAt).toDateString().slice(4, 10)
        },
        mailIsRead(){
            if(!this.mail.isRead) return 'mail-unread'
        },
    },
    methods: {
        hoverButtensOn(){
            this.isHoverd = true
        },
        hoverButtensOff(){
            this.isHoverd = false
        },
        remove(mailId) {
            if(this.mail.type !== 'trash') return this.mail.type = 'trash'
            this.$parent.$emit('remove', mailId)
        },
        details(mail) {
            this.$emit('details', mail)
            mail.isRead = true
        },
        read(mail) {
            mail.isRead = !mail.isRead
            this.$parent.$emit('read', mail)
        },
        star(mail) {
            mail.isStar = !mail.isStar
            this.$parent.$emit('read', mail)
        }
    },
}