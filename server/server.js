import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { sendToTelegram } from './telegram.js';

// Длины полей — в паре с src/js/validation.js
const MAX_QUESTION_LEN = 2000;
const MAX_CONTACT_LEN = 200;
const TELEGRAM_TEXT_MAX = 4096;

const PORT = Number(process.env.PORT) || 9000;

/** Список Origin для CORS, если задан CORS_ORIGIN (через запятую) */
function parseOrigins() {
  const raw = process.env.CORS_ORIGIN;
  if (!raw) return [];
  return raw.split(',').map(s => s.trim()).filter(Boolean);
}

const app = express();
// Без CORS_ORIGIN — как раніше: дозволено будь-який origin (зручно для локальної розробки).
// У продакшені задайте CORS_ORIGIN з доменом GitHub Pages.
const allowedOrigins = parseOrigins();
if (allowedOrigins.length > 0) {
  app.use(
    cors({
      origin: allowedOrigins,
      methods: ['POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
    })
  );
} else {
  app.use(cors());
}
app.use(express.json({ limit: '32kb' }));

// Щоб у браузері на http://localhost:9000/ не було "Cannot GET /" і було видно, що сервер живий
app.get('/', (_req, res) => {
  res.type('text/plain; charset=utf-8').send(
    'API працює. Для форми потрібен POST /send-question (у dev зазвичай через проксі Vite).'
  );
});

const sendQuestionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    reply: 'Забагато запитів. Спробуйте пізніше.',
  },
});

app.post('/send-question', sendQuestionLimiter, async (req, res) => {
  const question = typeof req.body?.question === 'string' ? req.body.question.trim() : '';
  const contact =
    typeof req.body?.contact === 'string' ? req.body.contact.trim() : '';

  if (!question) {
    return res.status(400).json({
      success: false,
      reply: 'Питання не може бути порожнім',
    });
  }

  if (!contact) {
    return res.status(400).json({
      success: false,
      reply: 'Будь ласка, залиште контактні дані для відповіді.',
    });
  }

  if (question.length > MAX_QUESTION_LEN) {
    return res.status(400).json({
      success: false,
      reply: `Питання занадто довге (макс. ${MAX_QUESTION_LEN} символів).`,
    });
  }

  if (contact.length > MAX_CONTACT_LEN) {
    return res.status(400).json({
      success: false,
      reply: `Контакт занадто довгий (макс. ${MAX_CONTACT_LEN} символів).`,
    });
  }

  const messageText = `Нове питання:\n${question}\nКонтакт: ${contact}`;

  if (messageText.length > TELEGRAM_TEXT_MAX) {
    return res.status(400).json({
      success: false,
      reply: 'Повідомлення занадто довге для відправки.',
    });
  }

  try {
    await sendToTelegram(messageText);
    res.json({ success: true, reply: 'Дякую, ваше питання отримано!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      reply: 'Помилка при відправці повідомлення',
    });
  }
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
