import mailPreview from '../cmps/mail-preview.cmp.js'

export default {
    name: 'mail-list',
    props:['mails'],
    template: `
    <section class="mail-main-list">

        <article class="mail-card"
                 
                 v-for="mail in mails" 
                 :key="mail.id">
         
                 <mail-preview  :mail="mail"/>

        </article>
    </section>
    `,
    created(){
        
    },
    components: {
        mailPreview,
    },
}