

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
                <button @click="isRed = !isRed" :class="readClass" >read</button>
                <button>star</button>

        </section>
    `,
    data(){
        return{
            isRed: true
        }
    },
    computed:{
        readClass(){
            return {readClassRed: this.isRed, readClassblue: !this.isRed,}
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
            this.$parent.$emit('read', mail)
        }
    },
}