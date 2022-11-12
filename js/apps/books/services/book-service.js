import { utilService } from '../../../general/services/util.service.js'
import { storageService } from '../../../general/services/async-storage.service.js'
import booksData from '../cmps/books-data.json' assert {type: 'json'}

const BOOK_KEY = 'booksDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    addReview,
    removeReview,
    getNextBookId,
    getPrevBookId,
    getGoogleBooks,
    addGoogleBook,
}


function query() {
    return storageService.query(BOOK_KEY)
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    book.id = utilService.makeId()
    const books = query()
    books.push(book)
    utilService.saveToStorage(BOOK_KEY, books)
    return book
}

function getEmptyBook() {
    return {id: '', title: '', listPrice: {amount: 0}}
}

function addReview(bookId, review) {
    review.id = utilService.makeId()
    return storageService.get(BOOK_KEY, bookId)
    .then(book => {
        if (!book.reviews) book.reviews = []
        book.reviews.unshift(review)
        return storageService.put(BOOK_KEY, book)
    })
}

function removeReview(bookId, reviewId) {
    return storageService.get(BOOK_KEY, bookId)
    .then(book => {
        book.reviews = book.reviews.filter(review => review.id !== reviewId)
        return storageService.put(BOOK_KEY, book)
    })
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
    .then(books => {
        let idx = books.findIndex(book => book.id === bookId) 
        if (idx === books.length - 1) idx = -1
        return books[idx+1].id 
    })
}

function getPrevBookId(bookId) {
    return storageService.query(BOOK_KEY)
    .then(books => {
        let idx = books.findIndex(book => book.id === bookId) 
        if (idx === 0) idx = books.length
        return books[idx-1].id 
    })
}

function getGoogleBooks(searchTerm) {
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`
    return axios.get(url)
    .then((res) => {
        return res.data.items.splice(0, 5)
    })
}

function addGoogleBook(book) {
    const { title, subtitle, authors, publishedDate, description, pageCount, categories, imageLinks, language } = book.volumeInfo
    let newBook = {
        id: book.id,
        title,
        subtitle,
        authors,
        publishedDate: publishedDate.slice(0, 3),
        description,
        pageCount,
        categories,
        thumbnail: imageLinks.thumbnail,
        language,
        listPrice: {
            amount: utilService.getRandomIntInclusive(19, 200),
            currencyCode: utilService.getRandomCurrency(),
            isOnSale: Math.random() < 0.5,
        }
    }
    return storageService.post(BOOK_KEY, newBook)
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = booksData
        utilService.saveToStorage(BOOK_KEY, books)
    }
    return books
}