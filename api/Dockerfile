# Dockerfile for .NET 8 API
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ApiDemo.csproj", "./"]
RUN dotnet restore "ApiDemo.csproj"
COPY . .
RUN dotnet build "ApiDemo.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ApiDemo.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 5000
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "ApiDemo.dll"]
