# Script para iniciar API y Frontend localmente sin Docker

Write-Host "🚀 Iniciando servicios locales..." -ForegroundColor Cyan
Write-Host ""

# Iniciar API en una nueva ventana de PowerShell
Write-Host "▶️  Iniciando API (.NET) en http://localhost:5000" -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\api'; dotnet run"

# Esperar un poco para que la API inicie
Start-Sleep -Seconds 2

# Iniciar Frontend en una nueva ventana de PowerShell
Write-Host "▶️  Iniciando Frontend (Vite) en http://localhost:5173" -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host ""
Write-Host "✅ Servicios iniciados!" -ForegroundColor Yellow
Write-Host ""
Write-Host "📍 URLs:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "   API:      http://localhost:5000" -ForegroundColor Cyan
Write-Host "   Swagger:  http://localhost:5000/swagger" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Para detener los servicios, cierra las ventanas de PowerShell" -ForegroundColor Gray
