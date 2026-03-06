using backend.Models;

namespace backend.Services;

public class ChatService : IChatService
{
    public async Task<ChatResponse> ProcessarMensagemAsync(string mensagemDoUsuario, string userId)
    {

        await Task.Delay(500);

        return new ChatResponse
        {
            Reply = $"Arquitetura Limpa! O serviço processou sua mensagem: '{mensagemDoUsuario}'. (Usuário: {userId})"
        };
    }
}