# API React Traefik - Full Stack Demo

Este proyecto demuestra una aplicación full-stack con:
- **Backend**: API REST en .NET 8
- **Frontend**: Aplicación React con Vite
- **Proxy Inverso**: Traefik para enrutamiento
- **Containerización**: Docker y Docker Compose
- **Debugging**: Soporte completo para depuración local

## 📋 Requisitos Previos

- Docker Desktop instalado y corriendo
- **Traefik ya corriendo en local** conectado a la red `traefik-network`
- .NET 8 SDK (opcional, para desarrollo local)
- Node.js 20+ (opcional, para desarrollo local)

## ⚙️ Configuración Inicial

Este proyecto usa un Traefik existente. Asegúrate de que:

1. Tu Traefik esté corriendo y tenga configurado el provider de Docker
2. Esté conectado a una red llamada `traefik-network`

Si la red no existe, créala:

```powershell
docker network create traefik-network
```

Si tu Traefik usa un nombre de red diferente, edita `docker-compose.yml` y cambia:

```yaml
networks:
  traefik-network:
    external: true
    name: tu-nombre-de-red  # Cambia esto
```

## 🚀 Inicio Rápido

### Modo Producción

```powershell
# Construir y levantar todos los servicios
docker-compose up --build

# O en modo detached (background)
docker-compose up -d --build
```

### Modo Debug/Desarrollo

```powershell
# Levantar con configuración de debugging
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up --build
```

## 🌐 Acceso a los Servicios

Una vez que los contenedores estén corriendo:

- **Frontend**: http://localhost
- **API**: http://localhost/api
- **Swagger API**: http://localhost/api/swagger
- **Traefik Dashboard**: Según tu configuración existente de Traefik

## 📁 Estructura del Proyecto

```
api-react-traefik/
├── api/                          # API .NET 8
│   ├── Controllers/
│   │   └── ProductsController.cs # Endpoints CRUD
│   ├── Models/
│   │   └── Product.cs            # Modelo de datos
│   ├── Program.cs                # Configuración de la API
│   ├── ApiDemo.csproj            # Proyecto .NET
│   ├── Dockerfile                # Imagen Docker para API
│   └── .dockerignore
├── frontend/                     # React + Vite
│   ├── src/
│   │   ├── App.jsx               # Componente principal
│   │   ├── App.css               # Estilos
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Estilos globales
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── Dockerfile                # Imagen Docker para frontend
│   ├── .env                      # Variables de entorno
│   └── .dockerignore
├── traefik/                      # Configuración Traefik (referencia)
│   ├── traefik.toml              # Ejemplo de configuración estática
│   └── dynamic.toml              # Ejemplo de configuración dinámica
├── docker-compose.yml            # Orquestación principal
├── docker-compose.debug.yml     # Configuración debug
├── .env                          # Variables de entorno globales
└── README.md                     # Este archivo
```

## 🔧 Comandos Útiles

### Docker Compose

```powershell
# Ver logs de todos los servicios
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f api
docker-compose logs -f frontend
docker-compose logs -f traefik

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir un servicio específico
docker-compose up -d --build api

# Ver estado de los contenedores
docker-compose ps
```

### Desarrollo Local (sin Docker)

#### API (.NET)

```powershell
cd api
dotnet restore
dotnet run
```

La API estará disponible en http://localhost:5000

#### Frontend (React)

```powershell
cd frontend
npm install
npm run dev
```

El frontend estará disponible en http://localhost:3000

## 🔍 Debugging

### Debugging de la API (.NET)

1. **Con Docker**: El contenedor ya incluye el debugger de Visual Studio
   ```powershell
   docker-compose -f docker-compose.yml -f docker-compose.debug.yml up
   ```

2. **Sin Docker**: Ejecuta directamente desde Visual Studio o VS Code
   - Abre la carpeta `api` en tu IDE
   - F5 para iniciar debugging

### Debugging del Frontend (React)

1. **Con Docker**: Los source maps están habilitados en modo desarrollo
   ```powershell
   docker-compose -f docker-compose.yml -f docker-compose.debug.yml up
   ```

2. **Sin Docker**: 
   ```powershell
   cd frontend
   npm run dev
   ```
   Usa las DevTools de Chrome/Edge para debugging

## 📝 API Endpoints

### Products

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/{id}` - Obtener producto por ID
- `POST /api/products` - Crear nuevo producto
- `PUT /api/products/{id}` - Actualizar producto
- `DELETE /api/products/{id}` - Eliminar producto

### Ejemplo de Request (POST)

```json
{
  "name": "Nuevo Producto",
  "description": "Descripción del producto",
  "price": 99.99
}
```

## 🎨 Características del Frontend

- ✅ Listado de productos con grid responsivo
- ✅ Crear nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos con confirmación
- ✅ Diseño moderno y responsivo
- ✅ Manejo de errores
- ✅ Loading states

## 🔄 Traefik Configuration

Este proyecto usa tu Traefik existente. Los servicios se conectan a la red `traefik-network` y usan labels para que Traefik los descubra automáticamente:

- **Frontend**: Todas las peticiones a `http://localhost/` → `frontend:3000`
- **API**: Peticiones a `http://localhost/api/*` → `api:5000/api/*`

### Requisitos de tu Traefik

Tu Traefik debe tener configurado:

1. **Provider de Docker** habilitado para descubrir contenedores automáticamente
2. **Red compartida** llamada `traefik-network` (o actualiza el nombre en docker-compose.yml)
3. **Entry point** en el puerto 80 (o actualiza las labels si usas otro puerto)

Ejemplo de configuración mínima para tu Traefik:

```toml
[providers.docker]
  exposedByDefault = false
  network = "traefik-network"

[entryPoints]
  [entryPoints.web]
    address = ":80"
```

### Labels de Traefik Explicados

```yaml
# Habilitar Traefik para este servicio
traefik.enable=true

# Regla de enrutamiento: Host y PathPrefix
traefik.http.routers.api.rule=Host(`localhost`) && PathPrefix(`/api`)

# Puerto interno del contenedor
traefik.http.services.api.loadbalancer.server.port=5000

# Middleware para eliminar el prefijo /api antes de enviar al backend
traefik.http.middlewares.api-stripprefix.stripprefix.prefixes=/api
```

## 🛠️ Solución de Problemas

### El frontend no puede conectarse a la API

1. Verifica que todos los contenedores estén corriendo:
   ```powershell
   docker-compose ps
   ```

2. Verifica que tu Traefik esté corriendo y conectado a la red `traefik-network`:
   ```powershell
   docker ps | findstr traefik
   docker network inspect traefik-network
   ```

3. Verifica los logs:
   ```powershell
   docker-compose logs -f api
   ```

4. Asegúrate de que la variable `VITE_API_URL` esté configurada correctamente en `frontend/.env`

### Error: network traefik-network not found

Crea la red manualmente:

```powershell
docker network create traefik-network
```

O si tu Traefik usa otro nombre de red, actualiza `docker-compose.yml`:

```yaml
networks:
  traefik-network:
    external: true
    name: tu-nombre-de-red
```

### Puerto 80 ya en uso

Si tienes otro servicio usando el puerto 80, puedes cambiar el puerto en `docker-compose.yml`:

```yaml
services:
  traefik:
    ports:
      - "8000:80"  # Cambia 80 por 8000 o el puerto que prefieras
```

Luego accede a `http://localhost:8000`

### Cambios en el código no se reflejan

Para desarrollo con hot-reload:

```powershell
# Usa el docker-compose.debug.yml
docker-compose -f docker-compose.yml -f docker-compose.debug.yml up

# O reinicia los contenedores
docker-compose restart
```

### Permisos de Docker en Windows

Si tienes problemas con volúmenes en Windows, asegúrate de que Docker Desktop tenga acceso a tus unidades:
- Docker Desktop → Settings → Resources → File Sharing

## 🧪 Testing

### Probar la API con curl

```powershell
# GET todos los productos
curl http://localhost/api/products

# GET producto específico
curl http://localhost/api/products/1

# POST nuevo producto
curl -X POST http://localhost/api/products `
  -H "Content-Type: application/json" `
  -d '{"name":"Test Product","description":"Test Description","price":49.99}'

# PUT actualizar producto
curl -X PUT http://localhost/api/products/1 `
  -H "Content-Type: application/json" `
  -d '{"name":"Updated Product","description":"Updated Description","price":59.99}'

# DELETE producto
curl -X DELETE http://localhost/api/products/1
```

## 📚 Tecnologías Utilizadas

- **.NET 8**: Framework backend moderno y de alto rendimiento
- **React 18**: Biblioteca frontend declarativa
- **Vite**: Build tool rápido para desarrollo frontend
- **Traefik 2.10**: Reverse proxy y load balancer cloud-native
- **Docker**: Containerización y orquestación
- **Swagger/OpenAPI**: Documentación automática de API

## 🚀 Próximos Pasos

- [ ] Agregar autenticación JWT
- [ ] Implementar base de datos (PostgreSQL/SQL Server)
- [ ] Agregar tests unitarios e integración
- [ ] Configurar CI/CD pipeline
- [ ] Implementar HTTPS con certificados
- [ ] Agregar logging centralizado
- [ ] Implementar rate limiting

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

## 👨‍💻 Autor

Creado como proyecto demo para desarrollo full-stack con Docker y Traefik.

---

**¡Disfruta desarrollando! 🎉**
