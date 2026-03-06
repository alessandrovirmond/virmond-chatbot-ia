import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Container, LoginCard, StyledButton } from "./App.styles";
import { Chat } from "./components/Chat";

function App() {
  return (
    <Container>
      <SignedOut>
        <LoginCard>
          <h1>Virmond AI</h1>
          <p>Seu assistente inteligente. Faça login para continuar.</p>
          <StyledButton>
            <SignInButton forceRedirectUrl="/">
              <button>Entrar com Google</button>
            </SignInButton>
          </StyledButton>
        </LoginCard>
      </SignedOut>

      <SignedIn>
        <div style={{ position: "absolute", top: "20px", right: "20px" }}>
          <UserButton afterSignOutUrl="/" />
        </div>
        <Chat />
      </SignedIn>
    </Container>
  );
}

export default App;