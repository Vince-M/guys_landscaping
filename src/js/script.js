console.log('Hello, this is the javascript file');

const btnHamburger = document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const nav__list = document.querySelector('.nav__list');
const mobile__fade = document.querySelector('.mobile__fade');

btnHamburger.addEventListener('click', function() {
  console.log('click hamburger');

  if(header.classList.contains('open')) { // Close Hamburger Menu
    body.classList.remove('noscroll');
    header.classList.remove('open');
    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');
    mobile__fade.classList.remove('fade-in');
    mobile__fade.classList.add('fade-out-menu');
    nav__list.classList.add('nav__list');
    nav__list.classList.remove('nav__list--open');
  } 
  else { // Open Hamburger Menu
    body.classList.add('noscroll');
    header.classList.add('open');
    overlay.classList.remove('fade-out');
    overlay.classList.add('fade-in');
    mobile__fade.classList.add('fade-in');
    mobile__fade.classList.remove('fade-out-menu');
    nav__list.classList.add('nav__list--open');
    nav__list.classList.remove('nav__list');
  }
  
});