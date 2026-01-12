document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-question');
  const modal = document.getElementById('question-modal');
  const form = document.getElementById('question-form');
  const closeBtn = document.querySelector('.modal-close');
  const formStatus = form.querySelector('.form-status');

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    formStatus.textContent = ''; // очищаємо статус
  });

  closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const question = document.getElementById('question-text').value.trim();
    const contact = document.getElementById('contact').value.trim();

    try {
      const res = await fetch('http://localhost:9000/send-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, contact })
      });

      const data = await res.json(); // ✅ обов'язково await
      formStatus.textContent = data.reply || 'Щось пішло не так...';

      if (data.success) form.reset();
    } catch (err) {
      formStatus.textContent = 'Помилка при надсиланні: ' + err.message;
    }
  });
});
