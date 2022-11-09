export default {
    props: ['mail'],
    template: `
        <section class="mail-preview flex">
            <router-link :to="'/mail/' + mail.id">         
            <section class="mail-card-content">
                    

                <h6>{{ mail.from }}</h6>
                    <h5>{{ mail.subject }}</h5>
                    <p>{{ mail.body }}</p>

                </section>    
            </router-link>
                <ul class="clean-list">
                    <li>{{ mail.isRead }}</li>
                    <li>{{ mail.sentAt }}</li>
                </ul>

        </section>
    `
}