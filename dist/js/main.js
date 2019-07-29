import Typewriter from './typewriter.js';

const gotoMainPage = () => {
    document.body.classList.remove('landing');
    document.body.classList.add('main-page');
};

const tw = new Typewriter({
    el: '.typewriter',
    typingSpeed: 1
});

tw.type();
tw.getContainer().addEventListener('typewriterDone', () => {

    document.body.addEventListener('keydown', (evt) => {
        // Browser compatibily
        let keypressed = evt.char || evt.charCode || evt.which;

        // 13 is the ENTER key
        if (keypressed != 13) {

            const errorMsg = document.createElement('p');
            errorMsg.textContent = 'Oops! You need to press \'ENTER\'';
            tw.getContainer().appendChild(errorMsg);

        } else {

            gotoMainPage();

        }
    });

});
