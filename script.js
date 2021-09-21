'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const buttonToSection1 = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navBar = document.querySelector('.nav');

const header = document.querySelector('.header');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
//////////////////////////////////////////
//page navigation

// const navScrolling = document.querySelectorAll('.nav__link');
// console.log(navScrolling);

// navScrolling.forEach(function (ele) {
//   ele.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

//////////////////////////////////////////

//using event delegation

//1.Add event listener to parent.
//2.determine which elemnt originated the event.
///////////////////////////////////////////
//scrolling using nav links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('btn--show-modal')
  ) {
    const id = document.querySelector(e.target.getAttribute('href'));
    id.scrollIntoView({
      behavior: 'smooth',
    });
  }
});

////////////////////////
//tabbing component
const tabs = document.querySelectorAll('.operations__tab');
const message = document.createElement('div');

const tabsContent = document.querySelectorAll('.operations__content');

const operationsContent = document.querySelectorAll('.operations__content');
document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    if (e.target.classList.contains('valid-operation')) {
      const boxNumber = String(e.target.classList[3])[
        String(e.target.classList[3]).length - 1
      ];
      //tab effects
      tabs.forEach(t => t.classList.remove('operations__tab--active'));
      e.target.classList.add('operations__tab--active');
      //activate content
      tabsContent.forEach(c =>
        c.classList.remove('operations__content--active')
      );

      document
        .querySelector(` .operations__content--${boxNumber}`)
        .classList.add('operations__content--active');
    }
  });

/////////////////////
//nav button effects
const hoverOverAndOut = function (e, opacity) {
  if (
    e.target.classList.contains('nav__link') ||
    e.target.classList.contains('nav__logo')
  ) {
    const clicked = e.target;

    const siblings = clicked.closest('nav').querySelectorAll('.nav__link');

    const logo = clicked.closest('nav').querySelector('img');
    siblings.forEach(function (s) {
      if (s != clicked) {
        s.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;

    clicked.style.opacity = 1;
  }
};
//here we are expected to put a function name as call back fuction but we have created such a function that other than a target 'e' as it is  also expecting another argument so we need to pass that to another callback function
//as done below
document.querySelector('.nav').addEventListener('mouseover', function (e) {
  hoverOverAndOut(e, 0.5);
});

////////////////////////////////////
//sticky navigation
const initialCoord = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCoord.top) navBar.classList.add('sticky');
//   if (window.scrollY < initialCoord.top) navBar.classList.remove('sticky');
// });

///////////////////////////////////
//sticky navigation using intersection observer

const whatWeWanttoHappen = function (entries, headerObserver) {
  entries.forEach(e => {
    if (!e.isIntersecting) {
      navBar.classList.add('sticky');
    } else {
      navBar.classList.remove('sticky');
    }
  });
};
const headerObserver = new IntersectionObserver(whatWeWanttoHappen, {
  root: null,
  threshold: 0,
});
headerObserver.observe(header);

//////////////////////////////
//section observer

const allSections = document.querySelectorAll('.section');
const onSec = function (entries, observer) {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.remove('section--hidden');
    } else {
      e.target.classList.add('section--hidden');
    }
  });
};
const sectionObserver = new IntersectionObserver(onSec, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(s => {
  s.classList.add('section--hidden');
  sectionObserver.observe(s);
});

///////////////////////////
//lazy image loading
const images = document.querySelectorAll('img');

const obsImage = function (entries, observer) {
  const [e] = entries;
  if (
    e.isIntersecting &&
    e.target.parentElement.classList.contains('features')
  ) {
    e.target.src = e.target.dataset.src;
    // e.target.src = e.target.datadet.src;
    e.target.addEventListener('load', function () {
      e.target.classList.remove('lazy-img');
    });
  }
};
const imagesObserver = new IntersectionObserver(obsImage, {
  root: null,
  threshold: 0.9,
});
images.forEach(i => imagesObserver.observe(i));

//////////////////////////
//slider
let currSlide = 0;
const sliderButtonLeft = document.querySelector('.slider__btn--left');
const slider = document.querySelector('.slider');
const slide = document.querySelectorAll('.slide');
const sliderButtonRight = document.querySelector('.slider__btn--right');

function forLeftNavigation() {
  if (currSlide == 0) {
    slide.forEach((s, i) => {
      s.style.transform =
        s.style.transform + `translate(${(slide.length - 1) * -100}%)`;
      currSlide = slide.length - 1;
    });
    return;
  }

  slide.forEach((s, i) => {
    s.style.transform = `translateX(${(i - currSlide) * 100 + 100}%)`;
  });
  currSlide--;
}

function forRightNavigation() {
  if (currSlide == slide.length - 1) {
    slide.forEach(s => {
      s.style.transform =
        s.style.transform + `translate(${(slide.length - 1) * 100}%)`;
      currSlide = 0;
    });
    return;
  }
  slide.forEach((s, i) => {
    s.style.transform = `translateX(${(i - currSlide) * 100 - 100}%)`;
  });
  currSlide++;
}

///////slider using mouse click

slide.forEach((s, i) => {
  s.style.transform = `translateX(${i * 100}%)`;
});

// let presentSlide = document.querySelector('.slide--1');
// let previousSlide;
// let nextSlide = document.querySelector('.slide--2');
sliderButtonRight.addEventListener('click', forRightNavigation);
sliderButtonLeft.addEventListener('click', forLeftNavigation);

////////////////slider Using Keyboard Keys

document.addEventListener('keydown', e => {
  if (e.key == 'ArrowLeft') {
    forLeftNavigation();
  } else if (e.key == 'ArrowRight') {
    forRightNavigation();
  }
});

///////////////////////////////////////////
//scroll to section 1 using learn to more button
buttonToSection1.addEventListener('click', e => {
  //coordinates of section  1
  const coorForSection1 = section1.getBoundingClientRect();
  // console.log(coorForSection1);
  // console.log(e.target);

  //scrolling functionality
  // window.scrollTo(
  //   coorForSection1.left + window.pageXOffset,
  //   coorForSection1.top + window.pageYOffset
  // );

  //making this functionality look like a more ready to use thing
  //we put it as an object to scrollTo functionality

  // window.scrollTo({
  //   left: coorForSection1.left + window.pageXOffset,
  //   top: coorForSection1.top + window.pageYOffset,
  //   behavior: 'smooth',

  // });

  //this was all old skool way
  section1.scrollIntoView({
    behavior: 'smooth',
  });

  //we need no horizontal scroll
});

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

//here btnsOpenModal is a node list so we can have a forEach loop over its all items.
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////////////
//adding message for cookie
message.classList.add('cookie-message');

message.innerHTML =
  'We include cookies for improved functionality!  <button class = "btn btn--close-cookie">Got It! </button> ';

header.append(message);
const cm = document.querySelector('.cookie-message');
//inline styles are being added here
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 10 + 'px';

cm.style.margin = Number.parseInt(getComputedStyle(cm).margin) + 20 + 'px';

//append - last child
//prepend - first child

//Changing attributes

//mouse enter event
// const alertOnScroll = () => {
//   alert(
//     'addEventListener : You are reading the heading!!! woww it showed on youst mouse pointing'
//   );
// };
// h1OnStarting.addEventListener('mouseenter', alertOnScroll);
//another way for attaching mouse entering event

// h1OnStarting.onmouseenter = () => {
//   alert(
//     'addEventListener : You are reading the heading!!! woww it showed on youst mouse pointing'
//   );
// };

//lets remover the event listener after a certain period of time
// setTimeout(() => {
//   h1OnStarting.removeEventListener('mouseenter', alertOnScroll);
// }, 3000);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// console.log(randomInt(0, 255));
// const randomColor = () => `rbg(${randomInt(0, 255)} , ${randomInt(0, 255)} )`;

// document.querySelector('.nav__links').addEventListener();

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
