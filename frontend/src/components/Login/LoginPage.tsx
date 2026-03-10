// src/components/Login/LoginPage.tsx
import { SignInButton } from "@clerk/clerk-react";
import { LoginCard, StyledButton } from "./LoginPage.styles";

export function LoginPage() {
  return (
    <LoginCard>
      <img 
        src="/assets/favicon.png" 
        alt="Virmond Logo" 
        width={80} 
        height={80} 
        style={{ marginBottom: '1rem', borderRadius: '12px' }} 
      />
      <h1>Virmond AI</h1>
      <p>Seu assistente inteligente. Faça login para continuar.</p>
      
      <StyledButton>
        <SignInButton forceRedirectUrl="/">
          <button>Entrar com Google</button>
        </SignInButton>
      </StyledButton>
    </LoginCard>
  );
}