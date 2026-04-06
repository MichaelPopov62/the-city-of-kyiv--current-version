// Список памятников: overlay и описание по клику
const items = document.querySelectorAll('.monuments-item');

function closeAll() {
  document.querySelectorAll('.js-overlay').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.description').forEach(desc => desc.classList.remove('active'));
}

function closeAllDescriptions() {
  document.querySelectorAll('.description').forEach(desc => desc.classList.remove('active'));
}

if (items.length > 0) {
  items.forEach(item => {
    const box = item.querySelector('.box');
    const overlay = item.querySelector('.js-overlay');
    const description = item.querySelector('.description');

    if (!box || !overlay || !description) return;

    box.addEventListener('click', event => {
      event.stopPropagation();
      closeAll();
      overlay.classList.add('active');
    });

    overlay.addEventListener('click', event => {
      event.stopPropagation();
      closeAllDescriptions();
      description.classList.add('active');
    });

    description.addEventListener('click', event => {
      event.stopPropagation();
      description.classList.remove('active');
    });
  });

  document.addEventListener('click', () => {
    closeAll();
  });
}
