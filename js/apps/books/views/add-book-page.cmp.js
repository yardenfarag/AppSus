import { bookService } from "../services/book-service.js"
import { showErrorMsg } from "../../../general/services/event-bus.service.js"

export default {
    template: `
        <section className="add-book">
            Search for a book online <input v-model="searchTerm" type="search"/>
            <button @click="searchBooks" class="btn">🔍</button>
            <div v-if="books" class="search-results">
                <ul v-for="book in books">
                    <li>{{book.volumeInfo.title}}</li>
                    <button @click="addBook(book.id); updateBooks" class="btn">Add</button>
                </ul>
            </div>
        </section>
    `,
    data() {
        return {
            books: null,
            searchTerm: null,
        }
    },
    methods: {
        searchBooks() {
            bookService.getGoogleBooks(this.searchTerm)
                .then(books => {
                    this.books = books
                })
                .catch(err => showErrorMsg('Something Went Wrong.. Try Again'))
        },
        addBook(id) {
            var book = this.books.find(book => book.id === id);
            bookService.addGoogleBook(book)
                .then((res) => {
                    const msg = {
                        txt: 'Book was successfully added!',
                        type: 'success',
                        link: '/book/' + res.id,
                    }
                    eventBus.emit('user-msg', msg)
                })
                .catch(err => {
                    showErrorMsg('Something Went Wrong.. Try Again')
                })
                this.clearInputAndBookList()

        },
        updateBooks() {
            this.$emit('updateBooks')
        },
        clearInputAndBookList() {
            this.searchTerm = null
            this.books = null
        }
    },
}