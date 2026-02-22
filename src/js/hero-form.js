const openBtn = document.getElementById('open-question');
const form = document.querySelector('.question-form');
if (openBtn && form) {
  openBtn.addEventListener('click', () => {
    form.classList.add('question-form--visible');
    openBtn.style.display = 'none';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    form.classList.remove('question-form--visible');
    openBtn.style.display = '';
  });
}
