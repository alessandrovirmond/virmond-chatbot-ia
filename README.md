# 🤖 Virmond AI ChatBot

[![Deploy to Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)Layout](https://virmond-chatbot-ia.vercel.app)
[![Deploy to Render](https://img.shields.io/badge/Deploy-Render-46E3B7?logo=render&logoColor=white)](#)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)](#)
[![.NET](https://img.shields.io/badge/Backend-.NET_10-512BD4?logo=dotnet&logoColor=white)](#)
[![Gemini](https://img.shields.io/badge/AI-Google_Gemini-8E75B2?logo=google&logoColor=white)](#)

> O **Virmond AI ChatBot** é uma aplicação Full-Stack desenvolvida para oferecer uma experiência de conversação fluida e inteligente, utilizando o poder do modelo Gemini 2.5 Flash do Google.

🚀 **Acesse a aplicação em produção:** [Virmond AI ChatBot na Vercel](https://virmond-chatbot-ia.vercel.app)

---

## 🏗️ Arquitetura do Projeto

Este projeto utiliza o padrão **Monorepo**, dividindo a aplicação em duas camadas principais totalmente desacopladas, mas gerenciadas sob o mesmo controle de versão:

### 🎨 Front-End (React + Vite)
- Interface construída com **React** e estilizada com **Styled Components**.
- Autenticação de usuários segura e moderna gerenciada pelo **Clerk**.
- Chaveamento automático de ambiente (Local/Produção) via variáveis de ambiente do Vite.
- Hospedagem e CI/CD via **Vercel**.

### ⚙️ Back-End (C# .NET 10)
- API RESTful limpa e performática construída em **.NET 10**.
- Padrão `IOptions` para injeção de dependência e gerenciamento seguro de chaves de API.
- Comunicação direta com a API do **Google Gemini**.
- Conteinerizado com **Docker** (Multi-stage build).
- Hospedagem e CI/CD via **Render**.

---

## 🔒 Segurança

Seguindo as melhores práticas do mercado, nenhuma chave sensível (API Keys, Secrets) é exposta no código-fonte. 
- O Front-End consome apenas a chave pública (`Publishable Key`) do Clerk.
- A comunicação com o Gemini é feita exclusivamente pelo Back-End, garantindo que a API Key do Google permaneça blindada no servidor.

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (Para o Front-End)
- [.NET 10 SDK](https://dotnet.microsoft.com/) (Para o Back-End)
- Conta no [Clerk](https://clerk.com/) e no [Google AI Studio](https://aistudio.google.com/) para as chaves.

### Passo 1: Configurar o Back-End
1. Navegue até a pasta do servidor: `cd backend`
2. Crie o arquivo `appsettings.json` baseado no `appsettings.Development.json`.
3. Adicione suas chaves:
```json
{
  "Gemini": {
    "ApiUrl": "[https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent](https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent)",
    "ApiKey": "SUA_CHAVE_GEMINI_AQUI"
  },
  "Clerk": {
    "Authority": "URL_DO_SEU_CLERK"
  }
}
