using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendMessage([FromBody] ChatRequest request)
    {
        var userId = User.Identity?.Name ?? "Usuário Desconhecido";

        var resposta = await _chatService.ProcessarMensagemAsync(request.Message, userId);

        return Ok(resposta);
    }
}