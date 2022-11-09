// import mailList from '../cmps/mail-list.cmp.js'
// import { mailService } from '../services/mail-service.js'

// export default {
//     template: `
//         <h1>inbox</h1>
//          <mail-list v-if="mails" :mails="mails"/>
//     `,

//     components:{
//         mailList
//     },
//     data() {
//         return {
//             mails: null,
//         }
//     },
//     created() {
//         mailService.query().then(mails => { 
//             this.mails = mails 
//             console.log(this.mails)
//         })
//     },
// }