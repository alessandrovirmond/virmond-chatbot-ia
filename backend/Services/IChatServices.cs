using backend.Models;

namespace backend.Services;

public interface IChatService
{
    Task<ChatResponse> ProcessarMensagemAsync(string mensagemDoUsuario, string userId);
}