// document.addEventListener('DOMContentLoaded', () => {
//   const navLinks = document.querySelectorAll('.nav-link');
//   const activeLine = document.querySelector('.active-line');

//   // перевірка на null
//   if (!activeLine) return console.warn('active-line не знайдено!');

//   function moveLine(link) {
//     if (!link) return;
//     const nav = link.closest('.heder-nav');
//     if (!nav) return;

//     const rect = link.getBoundingClientRect();
//     const navRect = nav.getBoundingClientRect();
//     activeLine.style.width = `${rect.width}px`; //Ширина смуги
//     activeLine.style.left = `${rect.left - navRect.left}px`; //Розрахунок лівої позиції(rect.left — відстань від лівого краю вікна до лінку. navRect.left — відстань від лівого краю вікна до навігації).
//   }

//   // розміщую смугу спочатку під активним
//   const current = document.querySelector('.nav-link.current');
//   if (current) moveLine(current);

//   // при кліку на пункт
//   navLinks.forEach(link => {
//     link.addEventListener('click', function () {
//       navLinks.forEach(l => l.classList.remove('current')); //проходжу по всіх пунктах і видаляю клас current
//       this.classList.add('current'); //додаю клас current до того, на який клікнули
//       moveLine(this); // переміщую смугу під активним пунктом
//     });
//   });
// });

const navLinks = document.querySelectorAll('.heder-nav .nav-link');
const activeLine = document.querySelector('.active-line');

function moveLine(link) {
  const rect = link.getBoundingClientRect();
  const navRect = link.closest('.heder-nav').getBoundingClientRect();

  activeLine.style.width = rect.width + 'px';
  activeLine.style.left = rect.left - navRect.left + 'px';
}
// функція для оновлення смуги під активним пунктом
function updateActiveLine() {
  const current = document.querySelector('.nav-link.current');
  if (current) moveLine(current);
}

// при завантаженні сторінки підсвічуємо активний
document.addEventListener('DOMContentLoaded', () => {
  updateActiveLine(); //повторне розрахування позиції смуги при завантаженні сторінки, щоб вона була під активним пунктом навіть після оновлення сторінки або при першому завантаженні.
});

// при кліку рухаємо смугу
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    navLinks.forEach(l => l.classList.remove('current'));
    e.target.classList.add('current');
    moveLine(e.currentTarget); // e.currentTarget - це посилання на елемент, до якого прикріплений обробник події (у цьому випадку - клікнутий пункт меню)
  });
});
// **ОНОВЛЮЄМО СМУГУ ПРИ ЗМІНІ РОЗМІРУ ВІКНА**
window.addEventListener('resize', () => {
  updateActiveLine();
});
