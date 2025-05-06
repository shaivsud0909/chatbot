# AI Chatbot 💬

A simple AI-powered chatbot using Google's Gemini API, built with **React** and **Tailwind CSS**. Supports **dark mode**, **chat history**, and **API integration**.

## Features 🚀

✔️ **AI Chat** – Chat with an AI using Google's Gemini API  
✔️ **Dark Mode** – Toggle between light and dark themes  
✔️ **Chat History** – Stores and retrieves chat history from MongoDB  
✔️ **Responsive Design** – Mobile-friendly UI

## Installation & Setup 🛠️

1. **Clone the repository**

   Download the code as zip, extract and open in terminal .

   ```sh
   git clone https://github.com/sharadj19/aichatbot.git
   cd aichatbot
   ```

2. **Install dependencies**

   In Both backend and frontend install dependencies

   ```sh
   cd backend
   npm install

   cd frontend
   npm install
   ```

3. **Start the backend server**

   ```sh
   cd backend && node server.js
   ```

## Configuration ⚙️

Replace **API_KEY** in **geminiAPI.js** with your own Google Gemini API key:

```js
const API_KEY = "your-google-gemini-api-key";
```

## Technologies Used 🛠️

- **React** (Frontend)
- **Tailwind CSS** (Styling)
- **Google Gemini API** (AI Responses)
- **MongoDB & Express** (Chat History Storage)

## Screenshots




| View        | Light Mode | Dark Mode |
|-------------|------------|-----------|
| **Desktop**<br>(1280×720) | <img src="https://github.com/user-attachments/assets/13be6375-45ed-4230-82b6-dd768b4faa4e" width="400" style="border: 1px solid #eee; border-radius: 8px;" alt="Desktop Light Mode"> | <img src="https://github.com/user-attachments/assets/db7d2ca0-5c90-4421-8414-65b30d525965" width="400" style="border: 1px solid #333; border-radius: 8px;" alt="Desktop Dark Mode"> |
| **Mobile**<br>(428×928) | <img src="https://github.com/user-attachments/assets/71519100-9ea2-47eb-a578-c5390bb9cd2b" width="200" style="border: 1px solid #eee; border-radius: 8px;" alt="Mobile Light Mode"> | <img src="https://github.com/user-attachments/assets/9ce6c606-68b5-46d7-a337-d4e7916b53a9" width="200" style="border: 1px solid #333; border-radius: 8px;" alt="Mobile Dark Mode"> |