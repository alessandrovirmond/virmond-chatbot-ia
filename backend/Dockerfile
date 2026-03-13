# ETAPA 1: Construção (Build) - Usa o SDK completo do .NET 10
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copia apenas o arquivo de projeto e baixa as dependências
COPY *.csproj ./
RUN dotnet restore

# Copia o resto do código e compila a versão oficial de Produção
COPY . ./
RUN dotnet publish -c Release -o out

# ETAPA 2: Produção (Runtime) - Imagem super leve para o .NET 10
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

COPY --from=build /app/out .

ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "backend.dll"]