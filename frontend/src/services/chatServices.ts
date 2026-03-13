
export const sendMessageToApi = async (message: string, token: string) => {

  const API_BASE_URL = import.meta.env.DEV 
  ? "http://localhost:5014" 
  : "https://virmond-chatbot-ia.onrender.com";


  const response = await fetch("API_BASE_URL/api/chat/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Erro de comunicação com o servidor C#.");
  }

  return response.json();
};
