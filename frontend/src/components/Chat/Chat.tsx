import { Github, Send } from "lucide-react";
import { useChat } from "../../hooks/useChat";
import { ChatContainer, MessagesArea, MessageBubble, InputArea, ChatHeader } from "./Chat.styles";

export function Chat() {
  const { input, setInput, messages, sendMessage, isLoading } = useChat();

  return (
    <ChatContainer>
      <ChatHeader>
        <div className="left-section">
          <img src="/assets/favicon.png" alt="Virmond Logo" width={40} height={40} />
          <h2>Virmond AI</h2>
        </div>

        <div className="right-section">
          <a href="https://github.com/AlessandroVirmond" target="_blank" rel="noopener noreferrer" title="Ver no GitHub">
            <Github size={22} />
          </a>
          <span>Powered by Gemini</span>
        </div>
      </ChatHeader>
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
          disabled={isLoading} 
        />
        <button type="submit" disabled={isLoading}>
          <Send size={20} />
        </button>
      </InputArea>
    </ChatContainer>
  );
}