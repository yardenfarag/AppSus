

export default {
    inheritAttrs: false,
    name: 'mail-preview',
    props: ['mail'],
    emits: ['remove', 'details', 'read'],
    template: `
    <section class="main-mail-preview">
        <section v-on:mouseover="hoverButtensOn" v-on:mouseleave="hoverButtensOff"  class="mail-preview flex">
            <router-link :to="'/mail/' + mail.id">         
                <section @click="details(mail)" class="mail-card-content flex">
                    

                <button class="card-button" @click="star(mail)" :class="starClass"><i class="fa-regular fa-star"></i></button>
                <h5>{{ mail.from }}</h5>
                    <h5 class="mail-subject">{{ mail.subject }}</h5>
                
                    <div class="mail-body-prev">

                        <p>{{ mail.body }}</p>
                    </div>
         

                </section>    
            </router-link>
            <div class="mail-date flex">

                </div>
                <section v-if="isHoverd" class="mail-preview-buttens flex">
                    <button class="card-button" @click="remove(mail.id)"><i class="fa-solid fa-trash-can"></i></button>
                    <button class="card-button" @click="read(mail)" :class="readClass" ><i class="fa-regular fa-envelope"></i></button>
                </section>
                
                <h6 class="mail-date">{{ dateCalc }}</h6>
        </section>
    </section>
    `,
    data() {
        return {
            isRed: true,
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
    },
    methods: {
        hoverButtensOn(){
            this.isHoverd = true
        },
        hoverButtensOff(){
            this.isHoverd = false
        },
        remove(mailId) {
            this.$parent.$emit('remove', mailId)
            console.log(mailId)
        },
        details(mail) {
            console.log(mail)
            this.$emit('details', mail)
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