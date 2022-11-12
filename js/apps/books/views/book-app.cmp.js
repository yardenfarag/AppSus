import { bookService } from '../services/book-service.js'
import { showSuccessMsg, showErrorMsg } from "../../../general/services/event-bus.service.js"

import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'
import addBookPage from '../views/add-book-page.cmp.js'


export default {
    template: `
    <section class="book-app">
        <book-filter @filter="filter"/>
        <book-list v-if="books" @selected="selectBook" @remove="removeBook" :books="booksToShow"/>
        <add-book-page @updateBooks="updateDisplay"/>
    </section>
    `,
    created() {
        this.books = bookService.query()
        .then(books => this.books = books)
    },
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null,
        }
    },
    created() {
        bookService.query() 
        .then(books => this.books = books)   
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
            .then(() => {
                const idx = this.books.findIndex(book => book.id === bookId)
                this.books.splice(idx, 1)
                showSuccessMsg('Book Removed Successfully!')
            })
            .catch(err => {
                console.log('ERROR!', err)
                showErrorMsg('Something Went Wrong')
            })
        },
        selectBook(book) {
            this.selectedBook = book

        },
        filter(filterBy) {
            this.filterBy = filterBy
        },
        updateDisplay() {
            bookService.query() 
                .then(books => this.books = books)
                showSuccessMsg('Books Updated Successfully!')
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.books.filter(({title, listPrice: {amount}}) => regex.test(title)
             && (amount <= this.filterBy.toPrice)
             && (amount >= this.filterBy.fromPrice))
        }
    },
    components: {
        bookFilter,
        bookList,
        addBookPage,
    }
}