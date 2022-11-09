import { utilService } from '../../../general/services/util.service.js'
import { storageService } from '../../../general/services/async-storage.service.js'
import mailsData  from '../data/demo-data.js' 

const MAILS_KEY = 'mailsDB'
_createmails()

export const mailService = {
    query,
    get,
    save,
    remove,
}

function query() {
    return storageService.query(MAILS_KEY)
}

function get(mailId){
    return storageService.get(MAILS_KEY, mailId)
}

function save(mail){
        return storageService.put(MAILS_KEY, mail)  
}

function remove(reviewId){
    return storageService.remove(MAILS_KEY, reviewId)
}

function _createmails() {

    let mails = utilService.loadFromStorage(MAILS_KEY)
    if (!mails || !mails.length) {
        mails = mailsData
        utilService.saveToStorage(MAILS_KEY, mails)
    }
    return mails
}