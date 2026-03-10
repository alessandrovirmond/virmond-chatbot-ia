// src/App.tsx
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Container } from "./App.styles";
import { Chat } from "./components/Chat/Chat";
import { LoginPage } from "./components/Login/LoginPage";

function App() {
  return (
    <Container>
      <SignedOut>
        <LoginPage />
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