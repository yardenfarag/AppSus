export default {
	template: `
        <section className="home-page">
                <section className="hero-main">
                    <div class="hero-text">

                        <h1>Welcome To The Appsus</h1>
                        <h3>3 Apps | 2 Developers | 1 God</h3>
                       
                        <button @click="scrollTo" class="hero-btn">Let's Go!</button>
                    </div>
                </section>
                
                <section ref="apps" class="home-desc-main">
               
                    <article @click="articleClickes('note')" class="app-desc">
                        <img src="../../../assets/img/home-page/note.jpg" alt="" />
                        <div class="home-app-text">

                            <h2>Notes</h2>
                            <p>This is a book about a girl who goes to a new school and makes new friends.</p>
                        </div>
                    </article>
                    <article @click="articleClickes('mail')" class="app-desc">
                        <img src="../../../assets/img/home-page/mail.jpg" alt="" />
                        <div class="home-app-text">
                        <h2>E-mail</h2>
                        <p>This is a book about a girl who is taken to a world she thought only existed in fairytales.</p>
                        </div>
                    </article>
                    <article @click="articleClickes('book')" class="app-desc">
                        <img src="../../../assets/img/home-page/books.jpg" alt="" />
                        <div class="home-app-text">
                        <h2>Books</h2>
                        <p>This is a book about a young girl who is taken to a land where she must find her way back home.</p>
                        </div>
                    </article>
                </section>
        </section>
        
    `,

    methods:{
        articleClickes(ref){
            console.log(ref)
            if(ref === 'note') this.$router.push('/note')
            if(ref === 'mail') this.$router.push('/mail')
            if(ref === 'book') this.$router.push('/book')
        },
        scrollTo(){
            var element = this.$refs['apps'];
            var top = element.offsetTop;

            window.scrollTo(0, top);
        }
    }
}
