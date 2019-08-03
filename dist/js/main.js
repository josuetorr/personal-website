// Single Page App
const spa = {
    
    showEvent: new Event('show'),
    pages: [],

    /**
     * Adds '/landing' to the URL when first arriving to the website.
     * Sets up the event to the each page and to eacn nav link.
     * Adds the event to the landing page such that when the user click anywhere on the screen,
     * he/she is redirected to the homepage.
     */
    init: function() {

        spa.pages = document.querySelectorAll('.page');
        spa.pages.forEach(page => {

            page.addEventListener('show', spa.showPage);

        });

        document.querySelectorAll('.nav-item').forEach(link => { 
            
            link.addEventListener('click', spa.nav);

        });

        document.querySelector('#landing').addEventListener('click', (e) => {

            spa.interchangeActiveClass(e.target, document.querySelector('#homepage'));
            history.pushState({}, 'homepage', '#homepage');

        });

        history.replaceState({}, 'landing', '#landing');
        window.addEventListener('popstate', spa.popPage);

    },


    interchangeActiveClass: function(page1, page2) {

        page1.classList.remove('active');
        page2.classList.add('active');

    },

    nav: function(e) {

        e.preventDefault();
        const currentPage = document.querySelector('.active');
        const targetPageId = e.target.getAttribute('page-target');
        spa.interchangeActiveClass(currentPage, document.getElementById(targetPageId));
        history.pushState({}, targetPageId, `#${targetPageId}`);

    },

    /**
     * NOT USEFUL FOR NOW.
     * Might use it later
     * 
     * @param e 
     */
    showPage: function(e) {

        console.log('showPage:', e);

    },

    popPage: function(e) {

        const currentPage = document.querySelector('.active');
        const prevPageId = location.hash.replace('#', '');
        spa.interchangeActiveClass(currentPage, document.getElementById(prevPageId));

    }
};

document.addEventListener('DOMContentLoaded', spa.init);