using System.Text;
using System.Text.Json;
using backend.Models;
using backend.Models.Gemini;

namespace backend.Services;

public class ChatService : IChatService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public ChatService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    public async Task<ChatResponse> ProcessarMensagemAsync(string mensagemDoUsuario, string userId)
    {
        var apiUrl = _configuration["Gemini:ApiUrl"];
        var apiKey = _configuration["Gemini:ApiKey"];

        if (string.IsNullOrEmpty(apiUrl) || string.IsNullOrEmpty(apiKey))
        {
            return new ChatResponse { Reply = "Erro de Arquitetura: Chaves da IA não encontradas." };
        }

        var requestBody = new GeminiRequest
        {
            Contents = new List<GeminiContent>
            {
                new GeminiContent
                {
                    Parts = new List<GeminiPart>
                    {
                        new GeminiPart { Text = mensagemDoUsuario }
                    }
                }
            }
        };

        var jsonBody = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

        var client = _httpClientFactory.CreateClient();
        var urlCompleta = $"{apiUrl}?key={apiKey}";

        try
        {
            var response = await client.PostAsync(urlCompleta, content);

            if (!response.IsSuccessStatusCode)
            {
                var errorDetails = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Erro da API do Gemini: {errorDetails}");
                return new ChatResponse { Reply = "Desculpe, meus circuitos estão sobrecarregados no momento." };
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();
            
            var opcoesJson = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var geminiResponse = JsonSerializer.Deserialize<GeminiResponse>(jsonResponse, opcoesJson);

            var textoDaIA = geminiResponse?.Candidates?.FirstOrDefault()?.Content?.Parts?.FirstOrDefault()?.Text;

            return new ChatResponse 
            { 
                Reply = textoDaIA ?? "Não consegui processar uma resposta válida." 
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erro crítico: {ex.Message}");
            return new ChatResponse { Reply = "Ocorreu um erro ao tentar me comunicar com a Inteligência Artificial." };
        }
    }
}