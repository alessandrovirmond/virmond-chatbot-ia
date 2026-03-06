// src/components/Chat/Chat.tsx
import { Send } from "lucide-react";
import { useChat } from "../hooks/useChat";
import { ChatContainer, MessagesArea, MessageBubble, InputArea } from "./Chat.styles";

export function Chat() {
  const { input, setInput, messages, sendMessage, isLoading } = useChat();

  return (
    <ChatContainer>
      <MessagesArea>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} $isUser={msg.isUser}>
            {msg.text}
          </MessageBubble>
        ))}
        {isLoading && <MessageBubble $isUser={false}>Digitando...</MessageBubble>}
      </MessagesArea>

      <InputArea onSubmit={sendMessage}>
        <input 
          type="text" 
          placeholder="Digite sua mensagem..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading} // Trava o input enquanto carrega
        />
        <button type="submit" disabled={isLoading}>
          <Send size={20} />
        </button>
      </InputArea>
    </ChatContainer>
  );
}