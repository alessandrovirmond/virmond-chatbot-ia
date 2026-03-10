// src/components/Login/LoginPage.styles.ts
import styled from "styled-components";

export const LoginCard = styled.div`
  background: rgba(30, 41, 59, 0.7);
  padding: 3rem;
  border-radius: 16px;
  border: 1px solid #334155;
  text-align: center;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);

  h1 {
    margin-bottom: 0.5rem;
    color: #38bdf8;
  }

  p {
    color: #94a3b8;
    margin-bottom: 2rem;
  }
`;

export const StyledButton = styled.div`
  button {
    background-color: #38bdf8;
    color: #0f172a;
    font-weight: bold;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #0ea5e9;
      transform: translateY(-2px);
    }
  }
`;