

# Aplicación de Chat de Power Pops

Este proyecto es una aplicación de chat diseñada para simular un vendedor interactivo de la marca Power Pops, especializada en productos nutricionales. La aplicación integra modelos GPT de OpenAI para generar respuestas dinámicas y contextuales según las consultas de los usuarios.

## Características

- **Chat Interactivo:** Los usuarios pueden conversar con un asistente basado en IA.
- **Personalidad Personalizable:** Ajusta la personalidad del chatbot mediante el archivo `personality.txt` o utilizando almacenamiento local.
- **Historial de Chat:** Mantiene un historial de conversaciones, que se puede limpiar cuando sea necesario.
- **Diseño Responsivo:** Optimizado para varios tamaños de pantalla con una interfaz atractiva.
- **Integración con OpenAI:** Utiliza la API de OpenAI para generar respuestas.

## Estructura de Archivos

- `server.js`: Servidor backend para gestionar las interacciones del chat e integrar OpenAI.
- `personality.txt`: Define los rasgos de personalidad predeterminados del chatbot.
- `script.js`: Maneja la lógica del frontend para enviar y mostrar mensajes.
- `index.html`: Proporciona la estructura HTML de la aplicación.
- `style.css`: Contiene los estilos para la interfaz de la aplicación.

## Requisitos Previos

- Tener Node.js instalado en tu sistema.
- Una clave de API de OpenAI almacenada de manera segura en un archivo `.env`.

## Configuración

1. **Clonar el Repositorio**
   ```bash
   git clone https://github.com/tuusuario/power-pops-chat.git
   cd power-pops-chat

2. Instalar Dependencias

npm install


3. Configurar Variables de Entorno Crea un archivo .env en la raíz del proyecto y agrega tu clave de API de OpenAI:

OPENAI_API_KEY=tu_clave_de_openai


4. Iniciar el Servidor

node server.js

El servidor estará disponible en http://localhost:3000.


5. Acceder a la Aplicación Abre tu navegador y navega a http://localhost:3000.



Uso

Interacción con el Chatbot: Escribe un mensaje en el cuadro de texto y haz clic en "Enviar" o presiona Enter para enviar.

Personalizar la Personalidad: Edita el archivo personality.txt o utiliza el campo de entrada en el frontend para establecer una nueva personalidad para el chatbot.

Limpiar el Historial del Chat: Usa el botón "Limpiar Historial de Chat" (si está implementado) o envía una solicitud POST a /clear-chat-history.


Nota de Seguridad

Protección de la Clave API: Asegúrate de agregar tu archivo .env al archivo .gitignore para evitar subir datos sensibles por error.


Ejemplo de Archivo de Personalidad

"Eres Luis, el vendedor de Power Pops, un cereal y snack alto en proteína que combina nutrición, sabor y conveniencia. ...

