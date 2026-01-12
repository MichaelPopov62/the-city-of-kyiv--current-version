import express from 'express';
import cors from 'cors';
import { sendToTelegram } from './telegram.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-question', async (req, res) => {
  const { question, contact } = req.body;

  if (!question) {
    return res.status(400).json({ success: false, reply: "Питання не може бути порожнім" });
  }

  const messageText = `Нове питання:\n${question}\nКонтакт: ${contact || 'не вказано'}`;

  try {
    await sendToTelegram(messageText);
    res.json({ success: true, reply: "Дякую, ваше питання отримано!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, reply: "Помилка при відправці повідомлення" });
  }
});

app.listen(9000, () => console.log('Server started on http://localhost:9000'));
