# ETAPA 1: Construção (Build) - Usa o SDK completo do .NET 8
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia apenas o arquivo de projeto e baixa as dependências (Otimiza o cache do Docker)
COPY *.csproj ./
RUN dotnet restore

# Copia o resto do código e compila a versão oficial de Produção (Release)
COPY . ./
RUN dotnet publish -c Release -o out

# ETAPA 2: Produção (Runtime) - Imagem super leve, apenas para rodar o app
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copia o código compilado da Etapa 1 para esta etapa final
COPY --from=build /app/out .

# IMPORTANTE: O Render e nuvens modernas exigem que a aplicação escute na porta 8080
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

# O comando que "liga" o servidor C#. 
# ATENÇÃO: Se o nome do seu projeto C# (o arquivo .csproj) não for "backend.csproj", mude o nome da .dll abaixo.
ENTRYPOINT ["dotnet", "backend.dll"]