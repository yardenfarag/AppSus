

export default {
    inheritAttrs:false,
    name: 'mail-preview',
    props: ['mail'],
    emits: ['remove', 'details', 'read'],
    template: `
        <section  class="mail-preview flex">
            <router-link :to="'/mail/' + mail.id">         
            <section @click="details(mail)" class="mail-card-content">
                    

                <h6>{{ mail.from }}</h6>
                    <h5>{{ mail.subject }}</h5>
                    <p>{{ mail.body }}</p>

                </section>    
            </router-link>
                <ul class="clean-list">
                    <li>{{ mail.isRead }}</li>
                    <li>{{ mail.sentAt }}</li>
                </ul>

                <button @click="remove(mail.id)">remove</button>
                <button @click="read(mail)" :class="readClass" >read</button>
                <button @click="star(mail)" :class="starClass">star</button>

        </section>
    `,
    data(){
        return{
            isRed: true
        }
    },
    computed:{
        readClass(){
            return {readClassRed: this.mail.isRead, readClassblue: !this.mail.isRead,}
        },
        starClass(){
            return {readClassRed: this.mail.isStar, readClassblue: !this.mail.isStar,}
        }
    },
       methods: {
        remove(mailId){
            this.$parent.$emit('remove', mailId)
            console.log(mailId)
        },
        details(mail){
            console.log(mail)
            this.$emit('details', mail)
        },
        read(mail){
            mail.isRead = !mail.isRead
            this.$parent.$emit('read', mail)
        },
        star(mail){
            mail.isStar = !mail.isStar
            this.$parent.$emit('read', mail)
        }
    },
}