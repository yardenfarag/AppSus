const { createRouter, createWebHashHistory } = VueRouter

import homePage from '../general/views/app-home.cmp.js'

import mailApp from '../apps/mail/views/mail-app.cmp.js'
import mailDetails from '../apps/mail/views/mail-details.cmp.js'
// import mailDraft from '../apps/mail/cmps/mail-draft.cmp.js'
// // import mailInbox from '../apps/mail/cmps/mail-inbox.cmp.js'
// import mailSent from '../apps/mail/cmps/mail-sent.cmp.js'
// import mailTrash from '../apps/mail/cmps/mail-trash.cmp.js'

import noteApp from '../apps/note/views/note-app.cmp.js'
import noteDetails from '../apps/note/views/note-app.cmp.js'

import bookApp from '../apps/books/views/book-app.cmp.js'
import bookDetails from '../apps/books/views/book-details.cmp.js'

import aboutPage from '../general/views/app-about.cmp.js'


const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/mail',
            component: mailApp,
            children: [
                // {
                //     path: '/mail/inbox',
                //     component: mailInbox,
                // },
                // {
                //     path: '/mail/sent',
                //     component: mailSent,
                // },
                // {
                //     path: '/mail/draft',
                //     component: mailDraft,
                // },
                // {
                //     path: '/mail/trash',
                //     component: mailTrash,
                // },
                {
                    path: '/mail/:id',
                    component: mailDetails
                },
            ]
        },
        {
            path: '/note',
            component: noteApp
        },
        {
            path: '/note/:id',
            component: noteDetails
        },
        {
            path: '/book',
            component: bookApp
        },
        {
            path: '/book/:id',
            component: bookDetails
        },
        {
            path: '/about',
            component: aboutPage,
        },
    ]
}

export const router = createRouter(routerOptions)
