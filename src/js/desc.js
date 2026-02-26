document.addEventListener('DOMContentLoaded', () => {
  const districtsData = {
    holosiiv: {
      title: 'Голосіївський район',
      text: 'Велетенський ліс, ВДНГ, озера та затишні сучасні житлові комплекси.',
    },
    pechersky: {
      title: 'Печерський район',
      text: 'Елітний центр, Лавра, урядовий квартал, дорогі бутіки та круті схили.',
    },
    podolsky: {
      title: 'Подільський район',
      text: 'Андріївський узвіз, набережна та історична атмосфера.',
    },
    desnyansky: {
      title: 'Деснянський район',
      text: 'Троєщина, ринки та лісопаркові зони.',
    },
    darnitsky: {
      title: 'Дарницький район',
      text: 'Позняки, озера та новобудови.',
    },
    dnipro: {
      title: 'Дніпровський район',
      text: 'Гідропарк і зелені острови.',
    },
    solomyansky: {
      title: "Солом'янський район",
      text: 'КПІ, залізничний вокзал і стратегічне розташування.',
    },
    svyatoshinsky: {
      title: 'Святошинський район',
      text: 'Академмістечко та соснові парки.',
    },
    obolonsky: {
      title: 'Оболонський район',
      text: 'Набережна Дніпра та сучасні ЖК.',
    },
    shevchenkovskiy: {
      title: 'Шевченківський район',
      text: 'Золоті ворота та історичний центр.',
    },
  };

  const list = document.querySelector('.districts');
  const modal = document.getElementById('districtModal');
  const modalTitle = modal.querySelector('.modal-title');
  const modalText = modal.querySelector('.modal-text');
  const closeBtn = modal.querySelector('.modal-close');

  list.addEventListener('click', event => {
    const item = event.target.closest('.districts-item');
    if (!item) return;

    const key = item.dataset.district;
    const district = districtsData[key];
    if (!district) return;

    modalTitle.textContent = district.title;
    modalText.textContent = district.text;

    modal.classList.add('active');
  });

  // Закриття по кнопці
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Закриття по кліку на фон
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Закриття по Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modal.classList.remove('active');
    }
  });
});
