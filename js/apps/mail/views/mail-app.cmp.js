import { mailService } from '../services/mail-service.js'

import mailFilter from '../cmps/mail-filter.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailSideNav from '../cmps/mail-side-nav.cmp.js'


export default {
    template: `
            <section class="mail-app">

            <mail-filter />

            <section class="mail-main-container flex">
                <mail-side-nav />
                <mail-list />
            </section>



            </section>
    `,
    data() {
        return {}
    },

    components: {
        mailFilter,
        mailList, 
        mailSideNav,
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
}