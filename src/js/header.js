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
