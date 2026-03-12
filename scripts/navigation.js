const menuButton = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    // Change icon between hamburger and X
    if (navMenu.classList.contains('open')) {
        menuButton.innerHTML = '✖';
    } else {
        menuButton.innerHTML = '☰';
    }
});