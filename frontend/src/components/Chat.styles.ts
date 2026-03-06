import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 80vh;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid #334155;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

export const MessagesArea = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 80%;
  padding: 1rem;
  border-radius: 8px;
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.$isUser ? "#0ea5e9" : "#1e293b")};
  color: ${(props) => (props.$isUser ? "#f8fafc" : "#cbd5e1")};
  border-bottom-right-radius: ${(props) => (props.$isUser ? "0" : "8px")};
  border-bottom-left-radius: ${(props) => (props.$isUser ? "8px" : "0")};
`;

export const InputArea = styled.form`
  display: flex;
  padding: 1rem;
  background-color: #0f172a;
  border-top: 1px solid #334155;
  gap: 0.5rem;

  input {
    flex: 1;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid #334155;
    background-color: #1e293b;
    color: #f8fafc;
    outline: none;
    font-size: 1rem;

    &:focus {
      border-color: #38bdf8;
    }
  }

  button {
    background-color: #38bdf8;
    color: #0f172a;
    border: none;
    padding: 0 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #0ea5e9;
    }
  }
`;