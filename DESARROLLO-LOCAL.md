# Desarrollo Local - Guía Rápida

## 🎯 Inicio Rápido

### Opción 1: Script Automático (Recomendado)
```powershell
.\start-local.ps1
```

### Opción 2: VS Code Tasks
1. Presiona `Ctrl+Shift+P`
2. Escribe "Tasks: Run Task"
3. Selecciona "Run All (API + Frontend)"

### Opción 3: Manual

**Terminal 1 - API:**
```powershell
cd api
dotnet run
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

## 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:5173
- **API**: http://localhost:5000/api/products
- **Swagger**: http://localhost:5000/swagger

## 🔥 Hot Reload

Ambos servicios tienen hot-reload habilitado:
- **API**: Se recompila automáticamente al guardar archivos `.cs`
- **Frontend**: Vite actualiza instantáneamente los cambios en React

## 🛑 Detener Servicios

### Opción 1: Script
```powershell
.\stop-local.ps1
```

### Opción 2: Manual
Presiona `Ctrl+C` en cada terminal

## 🐛 Debugging

### API (.NET)
1. Abre el archivo `Program.cs` o cualquier controlador
2. Coloca breakpoints
3. Presiona `F5` o usa el panel de Debug
4. Selecciona ".NET Core Launch (API)"

### Frontend (React)
1. Usa las DevTools del navegador
2. Los source maps están habilitados automáticamente

## 📝 Configuración

### Variables de Entorno

**API** (`api/appsettings.Development.json`):
- Puerto: 5000
- CORS configurado para localhost:5173

**Frontend** (`frontend/.env.local`):
```
VITE_API_URL=http://localhost:5000/api
```

## 🔄 Cambiar entre Docker y Local

### De Docker a Local:
```powershell
docker-compose down
.\start-local.ps1
```

### De Local a Docker:
```powershell
.\stop-local.ps1
docker-compose up -d
```

## ⚡ Ventajas del Desarrollo Local

- ✅ Inicio más rápido (~3-5 segundos vs ~30 segundos con Docker)
- ✅ Hot reload instantáneo
- ✅ Debugging completo con breakpoints
- ✅ Menor consumo de recursos
- ✅ Logs más claros y directos

## 🐳 ¿Cuándo usar Docker?

- Probar la integración completa con Traefik
- Verificar el comportamiento en producción
- Probar configuraciones de red
- Desarrollo en equipo con configuración unificada
