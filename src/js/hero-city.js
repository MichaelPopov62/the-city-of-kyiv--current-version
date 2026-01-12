// Отримую кнопку
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Коли користувач прокручує сторінку, показую/приховую кнопку
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

// Коли користувач натискає кнопку, скролить вгору
scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Плавний скрол
  });
});