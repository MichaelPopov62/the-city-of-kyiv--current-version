import { validateForm } from './validation.js';

/**
 * URL для POST /send-question:
 * - якщо задано VITE_API_URL — прямий запит на цей хост (повний URL з протоколом);
 * - у dev без змінної — відносний шлях через проксі Vite → localhost:9000 (див. vite.config.js).
 */
function resolveSendQuestionUrl() {
  const fromEnv = String(import.meta.env.VITE_API_URL ?? '')
    .trim()
    .replace(/\/$/, '');
  if (fromEnv) {
    try {
      return new URL(
        '/send-question',
        fromEnv.endsWith('/') ? fromEnv : `${fromEnv}/`
      ).href;
    } catch {
      return null;
    }
  }
  if (import.meta.env.DEV) {
    const base = import.meta.env.BASE_URL || '/';
    return base.endsWith('/')
      ? `${base}api/send-question`
      : `${base}/api/send-question`;
  }
  return null;
}

const SEND_QUESTION_URL = resolveSendQuestionUrl();

document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-question');
  const modal = document.getElementById('question-modal');
  const form = document.getElementById('question-form');
  if (!openBtn || !modal || !form) return;

  const closeBtn = modal.querySelector('.modal-close');
  const formStatus = form.querySelector('.form-status');
  if (!closeBtn || !formStatus) return;

  const textarea = document.getElementById('question-text');
  const contactInput = document.getElementById('contact');
  if (!textarea || !contactInput) return;

  const DRAFT_KEY = 'question-draft';

  const clearStatusClasses = () => {
    formStatus.classList.remove('success', 'error');
  };

  const saveDraft = () => {
    sessionStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        question: textarea.value,
        contact: contactInput.value,
      })
    );
  };

  textarea.addEventListener('input', saveDraft);
  contactInput.addEventListener('input', saveDraft);

  const closeModal = () => {
    modal.classList.remove('active');
    openBtn.style.display = '';
    formStatus.textContent = '';
    clearStatusClasses();
  };

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
    openBtn.style.display = 'none';
    formStatus.textContent = '';
    clearStatusClasses();

    const draft = sessionStorage.getItem(DRAFT_KEY);
    if (!draft) return;
    try {
      const { question, contact } = JSON.parse(draft);
      textarea.value = question || '';
      contactInput.value = contact || '';
    } catch {
      sessionStorage.removeItem(DRAFT_KEY);
    }
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const question = textarea.value.trim();
    const contact = contactInput.value.trim();

    formStatus.textContent = '';
    clearStatusClasses();

    if (!SEND_QUESTION_URL) {
      formStatus.textContent =
        'Надсилання недоступне: некоректний VITE_API_URL або збірка без адреси API.';
      formStatus.classList.add('error');
      return;
    }

    const error = validateForm(question, contact);
    if (error) {
      formStatus.textContent = error;
      formStatus.classList.add('error');
      return;
    }

    try {
      const res = await fetch(SEND_QUESTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, contact }),
      });

      const raw = await res.text();
      let data;
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        formStatus.textContent = res.ok
          ? 'Сервер повернув не JSON (перевірте URL API та проксі).'
          : `Помилка ${res.status}. Якщо це dev — запустіть npm run server (порт 9000).`;
        formStatus.classList.add('error');
        return;
      }

      formStatus.textContent = data.reply || 'Щось пішло не так...';

      if (data.success) {
        formStatus.classList.add('success');
        form.reset();
        sessionStorage.removeItem(DRAFT_KEY);
        // Закрытие модалки после паузы, чтобы успели прочитать ответ
        window.setTimeout(() => closeModal(), 2200);
      } else {
        formStatus.classList.add('error');
      }
    } catch (err) {
      formStatus.textContent = 'Помилка при надсиланні: ' + err.message;
      formStatus.classList.add('error');
    }
  });
});
