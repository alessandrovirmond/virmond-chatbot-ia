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
        // 1. Pegar a URL e a Chave secreta do cofre (appsettings.json)
        var apiUrl = _configuration["Gemini:ApiUrl"];
        var apiKey = _configuration["Gemini:ApiKey"];

        if (string.IsNullOrEmpty(apiUrl) || string.IsNullOrEmpty(apiKey))
        {
            return new ChatResponse { Reply = "Erro de Arquitetura: Chaves da IA não encontradas." };
        }

        // 2. Montar o pedido no molde exato que o Gemini exige
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

        // Transforma o molde em Texto JSON
        var jsonBody = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

        // 3. Fazer a chamada HTTP para os servidores do Google
        var client = _httpClientFactory.CreateClient();
        var urlCompleta = $"{apiUrl}?key={apiKey}";

        try
        {
            var response = await client.PostAsync(urlCompleta, content);

            // Se o Google recusar a chave ou der erro na nuvem
            if (!response.IsSuccessStatusCode)
            {
                var errorDetails = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Erro da API do Gemini: {errorDetails}"); // Fica no terminal para você debugar
                return new ChatResponse { Reply = "Desculpe, meus circuitos estão sobrecarregados no momento." };
            }

            // 4. Receber a resposta, transformar de volta pra C# e extrair o texto
            var jsonResponse = await response.Content.ReadAsStringAsync();
            
            // Para ignorar diferenças de maiúsculas/minúsculas no JSON do Google
            var opcoesJson = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var geminiResponse = JsonSerializer.Deserialize<GeminiResponse>(jsonResponse, opcoesJson);

            // Mergulha na estrutura aninhada para pegar apenas o texto da resposta
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