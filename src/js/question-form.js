
import { validateForm } from './validation.js';

document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-question');
  const modal = document.getElementById('question-modal');
  const form = document.getElementById('question-form');
  const closeBtn = document.querySelector('.modal-close');
  const formStatus = form.querySelector('.form-status');

  const textarea = document.getElementById('question-text');
  const contactInput = document.getElementById('contact');

  const DRAFT_KEY = 'question-draft';

  // ===== автозбереження чернетки =====
  const saveDraft = () => {
    sessionStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        question: textarea.value,
        contact: contactInput.value
      })
    );
  };

  textarea.addEventListener('input', saveDraft);
  contactInput.addEventListener('input', saveDraft);

  // ===== відкриття модалки + відновлення чернетки =====
  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    openBtn.style.display = 'none';
    formStatus.textContent = '';

    const draft = sessionStorage.getItem(DRAFT_KEY);
    if (draft) {
      const { question, contact } = JSON.parse(draft);
      textarea.value = question || '';
      contactInput.value = contact || '';
    }
  });

  // ===== закриття модалки (БЕЗ reset) =====
  const closeModal = () => {
    modal.classList.remove('active');
    openBtn.style.display = '';
    formStatus.textContent = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  // ===== submit =====
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const question = textarea.value.trim();
    const contact = contactInput.value.trim();

    formStatus.textContent = '';

    const error = validateForm(question, contact);
    if (error) {
      formStatus.textContent = error;
      return;
    }

    try {
      const res = await fetch('http://localhost:9000/send-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, contact })
      });

      const data = await res.json();
      formStatus.textContent = data.reply || 'Щось пішло не так...';

      if (data.success) {
        formStatus.classList.add('success');
        form.reset();
        sessionStorage.removeItem(DRAFT_KEY); // ← важливо
      } else {
        formStatus.classList.add('error');
      }

    } catch (err) {
      formStatus.textContent = 'Помилка при надсиланні: ' + err.message;
    }
  });
});
