export default {
	template: `
        <header class="app-header">
            <router-link to="/">
                <img class="logo" src="assets/img/logo.png" alt="" />
            </router-link>
            <nav :class="toggleMenuClass">
                <router-link @click="toggleMenu" to="/about">
                <svg title="About" class="menu-btns" xmlns="http://www.w3.org/2000/svg" width="0.99em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 63 64"><path fill="currentColor" d="M61.928 31.948c0 16.763-13.589 30.353-30.352 30.353c-16.763 0-30.352-13.588-30.352-30.353c0-16.764 13.588-30.353 30.352-30.353c16.763 0 30.352 13.59 30.352 30.353zM31.576 8.38c-13.017 0-23.569 10.552-23.569 23.569c0 13.016 10.551 23.57 23.569 23.57c13.017 0 23.569-10.554 23.569-23.57C55.146 18.933 44.593 8.38 31.576 8.38zm-6.213 16.515c0-4.788 3.071-6.469 6.14-6.469c1.827 0 3.391.169 4.641 1.717c2.924 3.619-.339 7.131-4.057 8.99c-2.631 1.316-3.874 3.546-3.874 6.651v6.946h6.943v-4.094c0-6.25 4.02-4.679 6.944-8.588c3.954-5.288 3.099-11.249-2.267-15.496c-6.138-4.861-13.084-2.449-15.02-1.133c-1.609 1.093-7.309 5.153-6.213 13.887l6.747.014c0 .001.014-.817.014-2.425zm9.795 27.337v-7.126h-6.943v7.126h6.943z"/></svg>
                </router-link> 
                <router-link @click="toggleMenu" to="/mail">
                <svg title="Email" class="menu-btns" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><g fill="currentColor"><path d="M15.61 17.46c-.88 0-1.6-.72-1.6-1.6c0-.88.72-1.6 1.6-1.6c.88 0 1.6.72 1.6 1.6c0 .88-.72 1.6-1.6 1.6Z"/><path d="M16 23a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm0-11.5c2.45.03 4.44 2.08 4.44 4.55v.81c0 .89-.73 1.62-1.62 1.62c-.61 0-1.14-.34-1.42-.84c-.46.46-1.1.75-1.8.75c-1.4 0-2.54-1.14-2.54-2.54c0-1.4 1.14-2.54 2.54-2.54c.61 0 1.16.22 1.6.57v-.09c0-.26.23-.47.49-.47s.47.21.47.47v3.08a.67.67 0 0 0 1.34 0v-.81c0-1.97-1.58-3.59-3.51-3.62c-.96 0-1.87.36-2.55 1.03c-.68.67-1.06 1.57-1.06 2.53c0 1.96 1.6 3.56 3.56 3.56a.47.47 0 1 1 0 .94c-2.48 0-4.5-2.02-4.5-4.5c0-1.21.47-2.35 1.34-3.2c.86-.86 2.01-1.32 3.22-1.3Z"/><path d="M1 7.01C1 5.898 1.898 5 3.01 5H29c1.109 0 2 .904 2 2.01V25c0 1.109-.904 2-2.01 2H3.01A2.007 2.007 0 0 1 1 24.99V7.01Zm2-.005v.497l6.35 4.046a7.97 7.97 0 0 0-.902 1.797L3 9.873V22.68l5.62-3.581a7.99 7.99 0 0 0 1 1.733L3.08 25h25.855l-6.557-4.173a7.99 7.99 0 0 0 1-1.735L29 22.671V9.88l-5.452 3.47a7.974 7.974 0 0 0-.9-1.798L29 7.511v-.508L28.996 7H3.005l-.003.002l-.001.002v.001Z"/></g></svg>
                </router-link> 
                <router-link @click="toggleMenu" to="/note">
                <svg title="Notes" class="menu-btns" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 2048 2048"><path fill="currentColor" d="M1792 1271q61 27 128 36v613H677l-549-549V128h1792v229q-67 9-128 36V256H256v1024h512v512h1024v-521zM640 1408H347l293 293v-293zm1408-896v640h-64q-78 0-143-33t-112-95h-110q-28 59-70 106t-94 81t-113 51t-126 18h-64V896H640l-128-64l128-64h512V384h64q65 0 125 18t113 51t95 80t70 107h110q47-61 112-94t143-34h64zm-128 139q-24 8-41 20t-30 26t-25 33t-24 38h-269l-15-43q-28-79-91-134t-145-72v626q82-17 145-72t91-134l15-43h269q12 20 23 38t25 32t31 27t41 20V651z"/></svg>
                </router-link> 
                <router-link @click="toggleMenu" to="/book">
                <svg title="Books" class="menu-btns" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M4 9.5V9a1.5 1.5 0 0 1 1.5-1.5h8c1.043 0 1.963.533 2.5 1.341A2.997 2.997 0 0 1 18.5 7.5h8A1.5 1.5 0 0 1 28 9v.5h.499c1.105 0 2.001.89 2.001 1.995v16l-.001.067v.933c0 .827-.67 1.505-1.501 1.505H17.732a1.999 1.999 0 0 1-3.464 0H3c-.83 0-1.501-.668-1.501-1.495v-17.01c0-1.105.896-1.995 2.001-1.995H4Zm1.5-1A.5.5 0 0 0 5 9v15a.5.5 0 0 0 .5.5h8.264a2.5 2.5 0 0 1 1.736.701V10.5a2 2 0 0 0-2-2h-8Zm11 2v14.701a2.5 2.5 0 0 1 1.736-.701H26.5a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5h-8a2 2 0 0 0-2 2Zm-.498 15.378h-.004l.002.004l.002-.004ZM3.322 10.516a.995.995 0 0 0-.822.98v16.009c0 .55.445.995 1.001.995h11.055l.144.25a1.5 1.5 0 0 0 2.6 0l.144-.25h11.055c.552 0 1.001-.451 1.001-1.005v-16a.995.995 0 0 0-.823-.98L29 11v14.5a1.5 1.5 0 0 1-1.5 1.5H16.559L16 28.118L15.441 27H4.5A1.5 1.5 0 0 1 3 25.5V11l.323-.484Z"/></svg>
                </router-link>
            </nav>
            <button @click="toggleMenu" class="menu-btn">
            <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M16 16h4v4h-4v-4Zm-6 0h4v4h-4v-4Zm-6 0h4v4H4v-4Zm12-6h4v4h-4v-4Zm-6 0h4v4h-4v-4Zm-6 0h4v4H4v-4Zm12-6h4v4h-4V4Zm-6 0h4v4h-4V4ZM4 4h4v4H4V4Z"/></svg>
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
        },
    },
}
