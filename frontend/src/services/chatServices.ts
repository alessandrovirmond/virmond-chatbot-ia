export const sendMessageToApi = async (message: string, token: string) => {
  const response = await fetch("http://localhost:5014/api/chat/send", {
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
