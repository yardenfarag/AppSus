import { eventBus } from '../../../general/services/event-bus.service.js'

export default {
    name: 'mail-side-nav',
    emits: ['mailAdded'],
    template: `
    <section class="mail-side-nav">

    <button @click="addMail">new mail</button>

        <ul>
            <li>inbox</li>
            <li>sent</li>
            <li>drafts</li>
            <li>trash</li>
        </ul>
    </section>
    `,
    methods: {
        addMail() {
            eventBus.emit('addMail', true)
        }
    },
}