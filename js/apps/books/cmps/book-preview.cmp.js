

export default {
    props: ['book'],
    template: `
        <section class="book-preview">
                <div class="book">
                    <div class="book-props">
                        <img :src="book.thumbnail" alt="book cover">
                        <div class="book-info">
                            <span class="title">Title: {{book.title}}</span>
                            <span class="price">Price: {{formattedNum}}</span>
                        </div>
                    </div>
                </div>
        </section>
    `,
    computed: {
        formattedNum() {
            const {language, listPrice: {amount, currencyCode}} = this.book
            return new Intl.NumberFormat(language, {style: 'currency', currency: currencyCode}).format(amount)
        }
    },
}