import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import type { Message } from "../types/Chat";
import { sendMessageToApi } from "../services/chatServices";

export const useChat = () => {
  const { getToken } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Seja bem-vindo ao Virmond AI ChatBot. Como posso te ajudar hoje?",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: userText, isUser: true },
    ]);
    setIsLoading(true);
    try {
      const token = await getToken();
      if (!token) throw new Error("Acesso negado");

      const data = await sendMessageToApi(userText, token);

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: data.reply, isUser: false },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "❌ Ops, ocorreu um erro de conexão.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { input, setInput, messages, sendMessage, isLoading };
};
