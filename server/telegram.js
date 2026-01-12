import 'dotenv/config';

export async function sendToTelegram(text) {
  const TOKEN = process.env.TELEGRAM_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TOKEN || !CHAT_ID) throw new Error('TELEGRAM_TOKEN або TELEGRAM_CHAT_ID не задані в .env');

  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text })
  });

  const data = await response.json();
  if (!data.ok) throw new Error(`Помилка Telegram: ${data.description}`);
  return data;
}
