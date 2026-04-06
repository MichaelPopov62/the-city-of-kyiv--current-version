// Длины полей должны совпадать с server/server.js
const MAX_QUESTION_LEN = 2000;
const MAX_CONTACT_LEN = 200;

export function validateForm(question, contact) {
  if (!question) return 'Будь ласка, введіть ваше питання.';
  if (!contact) return 'Будь ласка, залиште контактні дані для відповіді.';
  if (question.length > MAX_QUESTION_LEN) {
    return `Питання не довше ${MAX_QUESTION_LEN} символів.`;
  }
  if (contact.length > MAX_CONTACT_LEN) {
    return `Контакт не довше ${MAX_CONTACT_LEN} символів.`;
  }
  return null;
}
