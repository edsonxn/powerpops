require('dotenv').config();
const express = require('express');
const fs = require('fs');
const { OpenAI } = require('openai');

const app = express();
const PORT = 3000;

// Archivo para el historial de chat
const chatHistoryFile = './chatHistory.json';

// Archivo para la personalidad
const personalityFile = './personality.txt';
let personality = 'neutral'; // Valor predeterminado

// Cargar historial al inicio
let chatHistory = [];
if (fs.existsSync(chatHistoryFile)) {
  chatHistory = JSON.parse(fs.readFileSync(chatHistoryFile, 'utf8'));
}

// Cargar personalidad al inicio
if (fs.existsSync(personalityFile)) {
  personality = fs.readFileSync(personalityFile, 'utf8').trim();
} else {
  console.warn(`El archivo ${personalityFile} no existe. Se usará la personalidad predeterminada.`);
}

// Configurar OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware para procesar JSON y servir archivos estáticos
app.use(express.json());
app.use(express.static('public'));

// Ruta para obtener el historial
app.get('/get-chat-history', (req, res) => {
  res.json({ history: chatHistory });
});

// Ruta para limpiar el historial
app.post('/clear-chat-history', (req, res) => {
  chatHistory = [];
  fs.writeFileSync(chatHistoryFile, JSON.stringify(chatHistory, null, 2));
  res.status(200).send('Historial limpiado.');
});

// Ruta para manejar el chat
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensaje no proporcionado' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `Eres un asistente con la siguiente personalidad: ${personality}` },
        ...chatHistory.map((h) => ({ role: h.role, content: h.content })),
        { role: 'user', content: message },
      ],
    });

    const reply = completion.choices[0]?.message?.content || 'Sin respuesta';
    chatHistory.push({ role: 'user', content: message });
    chatHistory.push({ role: 'assistant', content: reply });

    // Guardar el historial
    fs.writeFileSync(chatHistoryFile, JSON.stringify(chatHistory, null, 2));

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
