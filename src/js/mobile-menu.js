const menu = document.querySelector('[data-menu]');
const burger = document.querySelector('.burger-btn');
const close = document.querySelector('.close-btn');

if (menu && burger && close) {
  burger.addEventListener('click', () => {
    menu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  close.addEventListener('click', () => {
    menu.classList.remove('is-open');
    document.body.style.overflow = '';
  });

  menu.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (link && link.classList.contains('nav-link')) {
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}
const mq = window.matchMedia('(min-width: 768px)');

mq.addEventListener('change', event => {
  if (event.matches) {
    menu.classList.remove('is-open');
    document.body.style.overflow = '';
  }
});
