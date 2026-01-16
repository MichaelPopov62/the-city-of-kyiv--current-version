


import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css'


document.addEventListener('click', (e) => {

  const link = e.target.closest('a[data-large]');
  if (!link) return  // якщо клік не по потрібному <a>, нічого не робимо

  e.preventDefault()// блокуємо стандартну поведінку href="#"

    const largeImg = link.dataset.large;// шлях до великого зображення
  const altText = link.querySelector('img')?.alt || '';// alt текст зображення
  



  const instance = basicLightbox.create(
    `<img src="${largeImg}"
     alt="${altText}" class="coordinates-link">`)

  instance.show()// показуємо модальне вікно
})
