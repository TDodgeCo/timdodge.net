import '../css/app.css'
import Alpine from 'alpinejs'
import 'htmx.org'
import Markdoc from '@markdoc/markdoc'


// window.activeTab = function (tab) {
//     let tabs = document.querySelectorAll('.tab')
//     tabs.forEach((tab) => {
//         tab.classList.remove('active')
//     })
//     tab.classList.add('active')
// }
window.navTab = function (href) {
    return href.split('/').pop()
}


window.generatePreview = function (source) {
    let markdown = new Promise((resolve, reject) => {
        resolve(Markdoc.parse(source))
    })
        .then((val) =>
            Markdoc.transform(val))
        .then((val) =>
            Markdoc.renderers.html(val))
        .then((val) => {
            return val
        }).catch((reject) => {
            return reject
        })
    
    
        
    return markdown
}

window.testFunc = function () {
    alert('test')
}

window.Alpine = Alpine
Alpine.start()

