import mailAdd from '../cmps/mail-add.cmp.js'
import mailPreview from '../cmps/mail-preview.cmp.js'
import mailFilter from '../cmps/mail-filter.cmp.js'


export default {
    name: 'mail-list',
    props:['mailsData'],
    template: `

    <mail-add />
        <section v-if="showList" class="mail-main-list">
        <mail-filter @mailFilter="setFilter"/>

            <article class="mail-card"
                    
                    v-for="mail in mailsToShow" 
                    :key="mail.id">
            
                    <mail-preview  :mail="mail"/>
                    
                </article>
            </section>
            

    `,
    data(){
        return{
            showList: true,
            mails: this.mailsData,
            filterBy: {
                subject: '',
                type:'',
                isRead: false,
                isStar: false,
            }
        }
    },
    computed: {
        mailsToShow(){
            
            const regex = new RegExp(this.filterBy.subject, 'i')
            var mails = this.mails.filter(mail => regex.test(mail.subject))

            if(this.filterBy.isRead){
                mails.filter(mail => mail.isRead === this.filterBy.isRead)
            } 
            return mails
        }
    },
      methods: {
        setFilter(filterParams){
            this.filterBy = filterParams
        }
    },
    created(){
    },
    components: {
        mailAdd,
        mailPreview,
        mailFilter,
    },
}