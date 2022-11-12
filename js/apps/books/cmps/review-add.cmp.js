export default {
    emits: ['reviewed'],
    template: `
    <h1>Add a Review</h1>
        <form class="review-add">
            <label>
                Full name: <input  v-model="review.fullName" ref="input" type="text" />
            </label>
            <label>
                Rate:
                <select v-model.number="review.rate">
                    <option v-for="n in 5">{{n}}</option>
                </select>
            </label>
            <label>
                Read At: <input v-model="review.date" type="date" />
            </label>
            Type Your Review
            <label>
                <textarea name="" id="" cols="30" rows="7" v-model="review.text"></textarea>
            </label>
            <button  @click.prevent="addReview" class="btn">Submit Review</button>
        </form>
    `,
    data() {
        return {
            review: {
                fullName: 'Book Reader',
                rate: 1,
                date: '',
                text: '',
            }
        }
    },
    methods: {
        addReview() {
            this.$emit('reviewed', {...this.review})
            this.review = {
                fullName: 'Book Reader',
                rate: 1,
                date: '',
                text: '',
            }
        }
    },
    mounted() {
        this.$refs.input.focus()
    }
}