  // Акордеон FAQ
  // document.addEventListener('DOMContentLoaded', () => {
  //   const questions = document.querySelectorAll('.faq-question');
  window.addEventListener('load', () => {
  const questions = document.querySelectorAll('.faq-question');


    questions.forEach(q => {
      q.addEventListener('click', () => {

        const answer = q.nextElementSibling;
        const arrow = q.querySelector('.arrow');

        // Закриваємо інші відповіді
        document.querySelectorAll('.faq-answer').forEach(a => {
          if (a !== answer) {
            a.style.maxHeight = null;
            a.previousElementSibling.querySelector('.arrow').classList.remove('rotate');
          }
        });

        // Відкриваємо/закриваємо поточну
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
          arrow.classList.remove('rotate');
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          arrow.classList.add('rotate');
        }
      });
    });
  
  });