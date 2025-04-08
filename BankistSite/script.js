'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const nav = document.querySelector(`.nav`);
const tabs = document.querySelectorAll(`.operations__tab`);
const tabsContainer = document.querySelector(`.operations__tab-container`);
const tabsContent = document.querySelectorAll(`.operations__content`);

//click pa scroll na page down
btnScrollTo.addEventListener(`click`, function (e) {
  section1.scrollIntoView({ behavior: `smooth` });
});
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener(`click`, openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// const header = document.querySelector(`.header`);
// const allsections = document.querySelectorAll(`.section`);

// document.getElementById(`section--1`);
// document.getElementsByTagName(`button`);
// document.getElementsByClassName(`btn`);

// const message = document.createElement(`div`);
// message.classList.add(`cookie-message`);
// message.textContent = `We use cookied for impr`;
// message.innerHTML = `We use cookied for impr <button class=
// "btn btn--close-cookie">Got it!</button>`;
// header.append(message);

// document
//   .querySelector(`.btn--close-cookie`)
//   .addEventListener(`click`, function () {
//     message.remove();
//   });
// message.style.backgroundColor = `#37383d`;
// message.style.width = `120%`;
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 144 + `px`;
// document.documentElement.style.setProperty(`--color-primary`, `orangered`);

// const logo = document.querySelector(`.nav__logo`);

// const btnScrollTo = document.querySelector(`.btn--scroll-to`);
// const section1 = document.querySelector(`#section--1`);
// btnScrollTo.addEventListener(`click`, function (e) {
//   section1.scrollIntoView({ behavior: `smooth` });
// });

// const h1 = document.querySelector(`h1`);
// h1.addEventListener(`mouseenter`, function (e) {
//   alert(`addevent:readin headin`);
// });

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `rgb(${randomInt(0, 255)} ,
//   ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));

// document.querySelector(`.nav__link`).addEventListener(`click`, function (e) {
//   console.log(`LINK`, e.target);
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
//   console.log(`LINK`, e.target);
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector(`.nav`).addEventListener(
//   `click`,
//   function (e) {
//     console.log(`LINK`, e.target);
//     this.style.backgroundColor = randomColor();
//   },
//   true
// );

//page navigation

// document.querySelectorAll(`.nav__link`).forEach(function (el) {
//   el.addEventListener(`click`, function (e) {
//     e.preventDefault();
//     const id = this.getAttribute(`href`);
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   });
// });

//1.add event listener to common parent element
//2.determine what element originated the event
document.querySelector(`.nav__links`).addEventListener(`click`, function (e) {
  console.log(e.target);
  e.preventDefault();
  //matching strategy

  if (e.target.classList.contains(`nav__link`)) {
    const id = e.target.getAttribute(`href`);

    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});

//tabbed component

tabsContainer.addEventListener(`click`, function (e) {
  const clicked = e.target.closest(`.operations__tab`);

  //guard clause
  if (!clicked) return;
  //remove active classes
  tabs.forEach(t => t.classList.remove(`operations__tab--active`));

  tabsContent.forEach(c => c.classList.remove(`operations__content--active`));
  //active tab
  clicked.classList.add(`operations__tab--active`);
  //activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});
// const h1 = document.querySelector(`h1`);
// //ging downwords:child
// console.log(h1.querySelectorAll(`.highlight`));
// h1.children;
// h1.firstElementChild.style.color = `white`;
// h1.lastElementChild.style.color = `black`;

//MENU FADE ANIMATION:
const handleHover = function (e, opacity) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`.nav`).querySelector(`img`);

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
      // this = opacity -je bilo opacity prije bind metode i sa logom isto
    });
    logo.style.opacity = this;
  }
};
//passing `argument` in handler function
nav.addEventListener(`mouseover`, handleHover.bind(0.5));
nav.addEventListener(`mouseout`, handleHover.bind(1));

//Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener(`scroll`, function (e) {
//   if (window.scrollY > 78) nav.classList.add(`sticky`);
//   else nav.classList.remove(`sticky`);
// });
// const observerCallbck = function (entries, observer) {
//   entries.forEach(entry => {});
// };
// const observerOpt = {
//   //root-element the target is intercepting
//   //null-cijeli viewport of the page gleda
//   root: null,
//   //treshold -% of interesction at wich observer callback will be called
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(observerCallbck, observerOpt);
// observer.observe(section1);
//Sticky navigation 2
const header = document.querySelector(`.header`);
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add(`sticky`);
  else nav.classList.remove(`sticky`);
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Reveal sections
const allSections = document.querySelectorAll(`.section`);
const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove(`section--hidden`);
    //ovo da ugasis observer kad je obavio funkciju
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add(`section--hidden`);
});

//lazy loading images

const imgTargets = document.querySelectorAll(`img[data-src]`);
const loadIMG = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //replace src with data-src

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener(`load`, function () {
    entry.target.classList.remove(`lazy-img`);
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadIMG, {
  root: null,
  threshold: 0,
  rootMargin: `-300px`,
});

imgTargets.forEach(img => imgObserver.observe(img));

//SLIDER
const slider = function () {
  const slides = document.querySelectorAll(`.slide`);
  const btnLeft = document.querySelector(`.slider__btn--left`);
  const btnRight = document.querySelector(`.slider__btn--right`);
  let currSlide = 0;
  const maxSlide = slides.length;
  const dotCointainer = document.querySelector(`.dots`);

  //functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotCointainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDotBlinkWhileOnItsPage = function (slide) {
    document
      .querySelectorAll(`.dots__dot`)
      .forEach(dot => dot.classList.remove(`dots__dot--active`));
    //ovdje ${slide} mora ići sa "" ne rade nam ``
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active`);
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = ` translateX(${100 * (i - slide)}%)`)
    );
  };

  //Next slide
  const nextSlide = function () {
    if (currSlide === maxSlide - 1) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activateDotBlinkWhileOnItsPage(currSlide);
  };
  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlide - 1;
    } else {
      currSlide--;
    }

    goToSlide(currSlide);
    activateDotBlinkWhileOnItsPage(currSlide);
  };
  const init = function () {
    goToSlide(0);
    createDots();
    activateDotBlinkWhileOnItsPage(0);
  };
  init();
  //event handlers
  btnRight.addEventListener(`click`, nextSlide);
  btnLeft.addEventListener(`click`, prevSlide);
  document.addEventListener(`keydown`, function (e) {
    console.log(e);
    //if
    if (e.key === `ArrowLeft`) prevSlide();
    // or short circuting ,,still cant decide which is my style :(
    e.key === `ArrowRight` && nextSlide();
  });
  dotCointainer.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
      currSlide = Number(e.target.dataset.slide);
      goToSlide(currSlide);
      activateDotBlinkWhileOnItsPage(currSlide);
    }
  });
};
slider();

document.addEventListener(`DOMContentLoaded`, function (e) {
  console.log(
    `HTML parsed and DOM tree built! ,
     zavrseno ucitavanje prvo`,
    e
  );
});

document.addEventListener(`beforeunload`, function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = ``;
});

document.addEventListener(`load`, function (e) {
  console.log(`page fully loaded!`, e);
});
