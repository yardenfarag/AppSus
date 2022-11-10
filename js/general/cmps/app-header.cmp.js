export default {
	template: `
        <header class="app-header">
            <router-link to="/">
                <img class="logo" src="../../../assets/img/logo.png" alt="" />
            </router-link>
            <nav :class="toggleMenuClass">
                <router-link @click="toggleMenu" to="/">
                    <img src="../../../assets/img/home.png" alt="" />
                </router-link>  
                <router-link @click="toggleMenu" to="/about">
                    <img src="../../../assets/img/about.png" alt="" />
                </router-link> 
                <router-link @click="toggleMenu" to="/mail">
                    <img src="../../../assets/img/mail/mail.png" alt="" />
                </router-link> 
                <router-link @click="toggleMenu" to="/note">
                    <img src="../../../assets/img/note/note.png" alt="" />
                </router-link> 
                <router-link @click="toggleMenu" to="/book">
                    <img src="../../../assets/img/books/books.png" alt="" />
                </router-link>
            </nav>
            <button @click="toggleMenu" class="menu-btn">
                <img class="menu-btn-img" src="../../../assets/img/google-burger.png" alt="" />
            </button>
        </header>
    `,
    data() {
        return {
            isMenuOpen: false,
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        }
    },
    computed: {
        toggleMenuClass() {
            if (this.isMenuOpen) return 'open'
            else return ''
        }
    }
}
