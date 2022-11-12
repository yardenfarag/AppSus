import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
        <section class="book-list">
            <div class="book" v-for="book in books" :key="book.id">
                <book-preview :book="book"/>
                <section class="actions">
                    <router-link :to="'/book/' + book.id" class="btn">Details</router-link>
                    <button @click="remove(book.id)" class="btn">X</button>
                </section>
            </div>
        </section>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)
        },
        showDetails(book) {
            this.$emit('selected', book)
        }
    },
    components: {
        bookPreview,
    }
}