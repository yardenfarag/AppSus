import { bookService } from '../services/book-service.js'
import { eventBus, showErrorMsg } from '../../../general/services/event-bus.service.js'

import bookDesc from '../cmps/book-desc.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'
import reviewPreview from '../cmps/review-preview.cmp.js'

export default {
    template: `
        <section className="book-navigation">
            <router-link class="btn" :to="'/book/' + prevBookId">Previous Book</router-link>
            <router-link class="btn" :to="'/book/' + nextBookId">Next Book</router-link>
        </section>
        <section v-if="book" class="book-details">
            <div className="cover">
                <img :src="book.thumbnail" />
            </div>
            <div className="full-details">

                <h6>{{book.title}}</h6>
                <h3>{{book.subtitle}}</h3>
                By:<span v-for="author in book.authors">{{author}} </span>
                <h4 :class="priceStyle">Price: {{priceTag}} </h4>
                <h2 class="low" v-if="book.listPrice.isOnSale">SALE</h2>
                <book-desc :txt="book.description" :maxLength="100"/>
                <p>Language: {{book.language}}</p>
                <p>{{bookLength}}, {{bookAge}}</p>
                Categories:<span v-for="categorie in book.categories">{{categorie}}, </span>
            </div>
            <div className="review-add">
                <review-add @reviewed="addReview"/>
            </div>
            <div class="close">
                <router-link to="/book" class="btn">Close</router-link>
            </div>

        </section>
        <section class="book-reviews">
            <h1>Reviews</h1>
            <div v-if="book" v-for="review in book.reviews" :key="review.id">
                <review-preview @removed="removeReview" :review="review"/>
            </div>
        </section>
    `,
    data() {
        return {
            book: null,
            nextBookId: null,
            prevBookId: null,
        }
    },
    created() {
        this.loadBook()
    },
    methods: {
        loadBook() {
            bookService.get(this.bookId)
                .then(book => {
                    this.book = book
                    bookService.getNextBookId(book.id)
                        .then(nextBookId => this.nextBookId = nextBookId)
                    bookService.getPrevBookId(book.id)
                        .then(prevBookId => this.prevBookId = prevBookId)
                })
                .catch(err => showErrorMsg('Error Loading Book'))
        },
        addReview(review) {
            bookService.addReview(this.book.id, review)
            .then(book => {
                this.book = book
                const msg = {txt: 'Book Reviewed Successfully', type: 'success'}
                eventBus.emit('user-msg', msg)
            })
        },
        removeReview(reviewId) {
            bookService.removeReview(this.book.id, reviewId)
            .then(book => {
                this.book = book
                const msg = {txt: 'Review Removed!', type: 'success'}
                eventBus.emit('user-msg', msg)
            })
        }
    },
    computed: {
        bookId() {
            return this.$route.params.id
        },
        bookLength() {
            if (this.book.pageCount > 500) return 'Long reading'
            if (this.book.pageCount > 200) return 'Decent reading'
            return 'Light Reading'
        },
        bookAge() {
            if (((new Date().getFullYear()) - (this.book.publishedDate)) > 10) return 'Veteran Book'
            if (((new Date().getFullYear()) - (this.book.publishedDate)) <= 1) return 'New!'
            return this.book.publishedDate
        },
        priceTag() {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount)
        },
        priceStyle() {
            return { 'low': this.book.listPrice.amount < 20, 'high': this.book.listPrice.amount >= 150 }
        },
    },
    watch: {
        bookId() {
            this.loadBook()
        }
    },
    components: {
        bookDesc,
        reviewAdd,
        reviewPreview,
    }
    
}