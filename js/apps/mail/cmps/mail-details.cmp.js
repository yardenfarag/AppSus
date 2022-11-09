export default {
    props: ['mail'],
    template: `
    <section class="mail-details-main">

        <button @click="close">X</button>
            
            <h3>{{ mail.sentAt }} - {{ mail.subject }}</h3>
            <h5>{{ mail.from }}</h5>
            <p>{{ mail.body }}</p>
    </section>
    `,
    data() {
        return {}
    },
    created() {},
    methods: {
        close(){
            this.$emit('details', '')
        }
    },
    computed: {},
    unmounted() {},
}