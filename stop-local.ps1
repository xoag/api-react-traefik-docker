# Script para detener todos los procesos de desarrollo local

Write-Host "🛑 Deteniendo servicios locales..." -ForegroundColor Yellow

# Detener procesos de dotnet
$dotnetProcesses = Get-Process -Name "dotnet" -ErrorAction SilentlyContinue | Where-Object {
    $_.Path -like "*api*" -or $_.CommandLine -like "*ApiDemo*"
}
if ($dotnetProcesses) {
    $dotnetProcesses | Stop-Process -Force
    Write-Host "✓ API (.NET) detenida" -ForegroundColor Green
}

# Detener procesos de node (Vite)
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*vite*"
}
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force
    Write-Host "✓ Frontend (Vite) detenido" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Todos los servicios locales han sido detenidos" -ForegroundColor Cyan
