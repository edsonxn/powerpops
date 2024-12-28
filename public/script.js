let personality = localStorage.getItem('personality') || '';

// Función para guardar la personalidad
function savePersonality() {
  const personalityInput = document.getElementById('personality-input').value.trim();
  if (personalityInput) {
    personality = personalityInput;
    localStorage.setItem('personality', personality);
    alert('¡Personalidad guardada!');
  }
}

// Función para cargar la personalidad guardada en el input
window.onload = function () {
  const personalityInput = document.getElementById('personality-input');
  if (personality) personalityInput.value = personality;

  // Cargar el historial de conversación
  loadChatHistory();
};

// Función para cargar el historial de conversación
async function loadChatHistory() {
  const chatBox = document.getElementById('chat-box');
  try {
    const response = await fetch('/get-chat-history', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    const history = data.history || [];

    // Renderizar el historial en el chat-box
    chatBox.innerHTML = '';
    history.forEach(chat => {
      const role = chat.role === 'user' ? 'Tú' : 'Vendedor';
      chatBox.innerHTML += `<div><strong>${role}:</strong> ${chat.content}</div>`;
    });

    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    console.error('Error al cargar el historial de conversación:', error);
    chatBox.innerHTML = `<div><strong>Error:</strong> No se pudo cargar el historial de conversación.</div>`;
  }
}

// Modificar la función sendMessage para incluir la personalidad
async function sendMessage() {
  const userInput = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const message = userInput.value.trim();

  if (!message) return;

  chatBox.innerHTML += `<div><strong>Tú:</strong> ${message}</div>`;
  userInput.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, personality }),
    });

    const data = await response.json();
    const reply = data.reply || 'Error al recibir respuesta.';
    chatBox.innerHTML += `<div><strong>Vendedor:</strong> ${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (error) {
    console.error('Error:', error);
    chatBox.innerHTML += `<div><strong>Error:</strong> No se pudo conectar al servidor.</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

// Agregar evento para enviar mensaje con la tecla Enter
document.getElementById('user-input').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
