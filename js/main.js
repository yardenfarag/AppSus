const { createApp } = Vue

import { router } from './router/routes.js'

import appHeader from './general/cmps/app-header.cmp.js'
import appFooter from './general/cmps/app-footer.cmp.js'
import userMsg from './general/cmps/user-msg.cmp.js'

const options = {
	template: `
        <section>
            <app-header />
            <router-view />
            <app-footer />
            <user-msg />
        </section>
    `,
	components: {
		appHeader,
		appFooter,
		userMsg,
	},
}

const app = createApp(options)
app.use(router)
app.mount('#app')
