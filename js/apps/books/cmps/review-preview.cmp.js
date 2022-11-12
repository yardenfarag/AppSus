export default {
    props: ['review'],
    emits: ['removed'],
    template:`
    <section v-if="review" class="review">
            <h5>{{ review.fullName }}</h5>
            <h6>{{  review.date || todayDate }}</h6>
            <p>"{{ review.text }}"</p>
            <h6>{{ rateStars }}</h6>
            <button @click="remove" class="btn">X</button>
    </section>
    `,
    methods: {
        remove(){
            this.$emit('removed',this.review.id)
        }
    },
    computed: {
        todayDate() {
            return new Date().toISOString().substring(0, 10)
          },
        rateStars() {
            let stars = ''
            for (let i = 0; i < this.review.rate - 1; i++) {
                stars += '★'
            }
            return stars
        }
    },
}