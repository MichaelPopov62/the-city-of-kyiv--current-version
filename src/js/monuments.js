

//Знаходжу всі елементи списку пам'яток
const items = document.querySelectorAll('.monuments-item');

// Якщо елементів немає — нічого не виконую
if (items.length > 0) {
  items.forEach(item => {
    // Знаходжу box (картинка + overlay)
    const box = item.querySelector('.box');

    //Знаходжу overlay
    const overlay = item.querySelector('.js-overlay');

    // Знаходжу опис
    const description = item.querySelector('.description');

    // Якщо чогось немає — пропускаю
    if (!box || !overlay || !description) return;

    //Клік по box відкриває overlay
    box.addEventListener('click', event => {
      event.stopPropagation(); // блокую спливання

    // FIX: закриваю всі overlay та описи перед відкриттям нового
      closeAll();

      overlay.classList.add('active'); // показую overlay
    });

    //Клік по overlay показує опис
    overlay.addEventListener('click', event => {
      event.stopPropagation(); // блокую спливання
    // FIX: закриваю всі описи перед відкриттям нового
      closeAllDescriptions();
      description.classList.add('active'); // показую опис
    });

    //Клік по опису закриває його
    description.addEventListener('click', event => {
      event.stopPropagation(); //блокую спливання
      description.classList.remove('active'); //ховаю опис
    });
  });

   //  Клік по документу закриває все
  document.addEventListener('click', () => {
    closeAll(); // FIX
  });
  
  // Функція закриває всі overlay та описи
function closeAll() { // FIX
  document.querySelectorAll('.js-overlay')
    .forEach(el => el.classList.remove('active'));

  document.querySelectorAll('.description')
    .forEach(desc => desc.classList.remove('active'));
}

// Функція закриває тільки описи
function closeAllDescriptions() { // FIX
  document.querySelectorAll('.description')
    .forEach(desc => desc.classList.remove('active'));
}
}
