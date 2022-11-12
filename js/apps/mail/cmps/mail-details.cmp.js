export default {
    props: ['mail'],
    template: `
    <section class="mail-details-main">

        <!-- <i @click="close" class="mail-close-details fa-solid fa-arrow-left"></i> -->
        <button @click="close" class="mail-close-details">←</button>
            <section class="mail-details-content flex">

                <h3>{{ dateCalc }} - {{ mail.subject }}</h3>
                <h5>{{ mail.from }}</h5>
                <p>{{ mail.body }}</p>
            </section>
    </section>
    `,
    data() {
        return {}
    },
    created() {},
    computed: {
        dateCalc() {
            return new Date(this.mail.sentAt).toDateString().slice(4, 10)
        },
    },
    methods: {
        close(){
            this.$emit('details', '')
        },
        send(){
            this.$emit('details', '')
        }
    },
    unmounted() {},
}