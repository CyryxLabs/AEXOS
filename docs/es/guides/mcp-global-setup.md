<!--
  Traducción: ES
  Original: /docs/en/guides/mcp-global-setup.md
  Última sincronización: 2026-01-26
-->

# Guía de Configuración Global de MCP en AEXOS

> 🌐 [EN](../../guides/mcp-global-setup.md) | [PT](../../pt/guides/mcp-global-setup.md) | **ES**

---

> Configura servidores MCP (Model Context Protocol) globales para AEXOS (Cyryx).

**Versión:** 2.1.1
**Última Actualización:** 2025-12-23

---

## Descripción General

El Sistema Global de MCP te permite configurar servidores MCP una vez y compartirlos en todos los proyectos AEXOS. Esto elimina la necesidad de configurar los mismos servidores en cada proyecto.

### Beneficios

| Beneficio                        | Descripción                                               |
| -------------------------------- | --------------------------------------------------------- |
| **Configuración Única**          | Configura los servidores una vez, úsalos en todas partes  |
| **Configuraciones Consistentes** | Mismas configuraciones de servidor en todos los proyectos |
| **Gestión de Credenciales**      | Almacenamiento de credenciales centralizado y seguro      |
| **Actualizaciones Fáciles**      | Actualiza versiones de servidor en un solo lugar          |

### Estructura del Directorio Global

```
~/.aexos/
├── mcp/
│   ├── global-config.json    # Archivo de configuración principal
│   ├── servers/              # Configuraciones individuales de servidor
│   │   ├── context7.json
│   │   ├── exa.json
│   │   └── github.json
│   └── cache/                # Caché de respuestas del servidor
└── credentials/              # Almacenamiento seguro de credenciales
    └── .gitignore            # Previene commits accidentales
```

---

## Rutas Específicas por Plataforma

### Windows

```
C:\Users\<username>\.cyryx\mcp\global-config.json
C:\Users\<username>\.cyryx\mcp\servers\
C:\Users\<username>\.cyryx\credentials\
```

### macOS

```
/Users/<username>/.aexos/mcp/global-config.json
/Users/<username>/.aexos/mcp/servers/
/Users/<username>/.aexos/credentials/
```

### Linux

```
/home/<username>/.aexos/mcp/global-config.json
/home/<username>/.aexos/mcp/servers/
/home/<username>/.aexos/credentials/
```

---

## Configuración Inicial

### Paso 1: Crear Estructura Global

```bash
# Create global directory and config
aexos mcp setup
```

**Esto crea:**

- `~/.aexos/` - Directorio global de AEXOS
- `~/.aexos/mcp/` - Directorio de configuración MCP
- `~/.aexos/mcp/global-config.json` - Archivo de configuración principal
- `~/.aexos/mcp/servers/` - Configuraciones individuales de servidor
- `~/.aexos/mcp/cache/` - Caché de respuestas
- `~/.aexos/credentials/` - Almacenamiento seguro de credenciales

### Paso 2: Verificar Configuración

```bash
# Check global config exists
aexos mcp status
```

**Salida Esperada:**

```
MCP Global Configuration
========================

Location: ~/.aexos/mcp/global-config.json
Status:   ✓ Configured

Servers: 0 configured
Cache:   Empty

Run 'aexos mcp add <server>' to add servers.
```

---

## Agregar Servidores MCP

### Usando Plantillas

AEXOS incluye plantillas para servidores MCP populares:

```bash
# Add from template
aexos mcp add context7
aexos mcp add exa
aexos mcp add github
aexos mcp add puppeteer
aexos mcp add filesystem
aexos mcp add memory
aexos mcp add desktop-commander
```

### Plantillas Disponibles

| Plantilla           | Tipo    | Descripción                               |
| ------------------- | ------- | ----------------------------------------- |
| `context7`          | SSE     | Búsquedas de documentación de bibliotecas |
| `exa`               | Command | Búsqueda web avanzada                     |
| `github`            | Command | Integración con API de GitHub             |
| `puppeteer`         | Command | Automatización de navegador               |
| `filesystem`        | Command | Acceso al sistema de archivos             |
| `memory`            | Command | Almacenamiento temporal en memoria        |
| `desktop-commander` | Command | Automatización de escritorio              |

### Configuración de Servidor Personalizado

```bash
# Add custom server with JSON config
aexos mcp add my-server --config='{"command":"npx","args":["-y","my-mcp-server"]}'

# Add from config file
aexos mcp add my-server --config-file=./my-server-config.json
```

---

## Comandos CLI

### `aexos mcp setup`

Inicializa la configuración global de MCP.

```bash
# Create global structure
aexos mcp setup

# Force recreate (backup existing)
aexos mcp setup --force

# Specify custom location
aexos mcp setup --path=/custom/path
```

### `aexos mcp add`

Agrega un nuevo servidor MCP.

```bash
# Add from template
aexos mcp add context7

# Add with custom config
aexos mcp add custom-server --config='{"command":"npx","args":["-y","package"]}'

# Add with environment variables
aexos mcp add exa --env='EXA_API_KEY=your-key'
```

### `aexos mcp remove`

Elimina un servidor MCP.

```bash
# Remove server
aexos mcp remove context7

# Remove with confirmation skip
aexos mcp remove context7 --yes
```

### `aexos mcp list`

Lista los servidores configurados.

```bash
# List all servers
aexos mcp list

# List with details
aexos mcp list --verbose

# List only enabled
aexos mcp list --enabled
```

**Salida:**

```
Configured MCP Servers
======================

  context7     [enabled]  SSE  https://mcp.context7.com/sse
  exa          [enabled]  CMD  npx -y exa-mcp-server
  github       [disabled] CMD  npx -y @modelcontextprotocol/server-github

Total: 3 servers (2 enabled, 1 disabled)
```

### `aexos mcp enable/disable`

Habilita o deshabilita servidores.

```bash
# Disable server
aexos mcp disable github

# Enable server
aexos mcp enable github

# Toggle
aexos mcp toggle github
```

### `aexos mcp status`

Muestra el estado global de MCP.

```bash
# Full status
aexos mcp status

# JSON output
aexos mcp status --json
```

### `aexos mcp sync`

Sincroniza la configuración global con el proyecto.

```bash
# Sync to current project
aexos mcp sync

# Sync specific servers only
aexos mcp sync --servers=context7,exa
```

---

## Archivos de Configuración

### global-config.json

Archivo de configuración principal con todas las definiciones de servidor.

```json
{
  "version": "1.0",
  "servers": {
    "context7": {
      "type": "sse",
      "url": "https://mcp.context7.com/sse",
      "enabled": true
    },
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "${EXA_API_KEY}"
      },
      "enabled": true
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      },
      "enabled": true
    }
  },
  "defaults": {
    "timeout": 30000,
    "retries": 3
  }
}
```

### Archivos Individuales de Servidor

Cada servidor también tiene su propio archivo de configuración en `servers/`:

```json
// ~/.aexos/mcp/servers/context7.json
{
  "type": "sse",
  "url": "https://mcp.context7.com/sse",
  "enabled": true
}
```

---

## Tipos de Servidor

### SSE (Server-Sent Events)

Para servidores que proporcionan un endpoint HTTP de streaming.

```json
{
  "type": "sse",
  "url": "https://mcp.server.com/sse",
  "enabled": true
}
```

### Command

Para servidores que se ejecutan como procesos locales.

```json
{
  "command": "npx",
  "args": ["-y", "@package/mcp-server"],
  "env": {
    "API_KEY": "${API_KEY}"
  },
  "enabled": true
}
```

### Wrapper de Comando para Windows

Para Windows, usa el wrapper CMD para NPX:

```json
{
  "command": "cmd",
  "args": ["/c", "npx-wrapper.cmd", "-y", "@package/mcp-server"],
  "env": {
    "API_KEY": "${API_KEY}"
  },
  "enabled": true
}
```

---

## Variables de Entorno

### Usando Variables en la Configuración

Referencia variables de entorno usando la sintaxis `${VAR_NAME}`:

```json
{
  "env": {
    "API_KEY": "${MY_API_KEY}",
    "TOKEN": "${MY_TOKEN}"
  }
}
```

### Configurando Variables

**Windows (PowerShell):**

```powershell
$env:EXA_API_KEY = "your-api-key"
$env:GITHUB_TOKEN = "your-github-token"
```

**Windows (CMD):**

```cmd
set EXA_API_KEY=your-api-key
set GITHUB_TOKEN=your-github-token
```

**macOS/Linux:**

```bash
export EXA_API_KEY="your-api-key"
export GITHUB_TOKEN="your-github-token"
```

### Variables Persistentes

**Windows:** Agregar a Variables de Entorno del Sistema

**macOS/Linux:** Agregar a `~/.bashrc`, `~/.zshrc`, o `~/.profile`:

```bash
export EXA_API_KEY="your-api-key"
export GITHUB_TOKEN="your-github-token"
```

---

## Gestión de Credenciales

### Almacenamiento Seguro

Las credenciales se almacenan en `~/.aexos/credentials/` con un `.gitignore` para prevenir commits accidentales.

```bash
# Add credential
aexos mcp credential set EXA_API_KEY "your-api-key"

# Get credential
aexos mcp credential get EXA_API_KEY

# List credentials (masked)
aexos mcp credential list
```

### Formato del Archivo de Credenciales

```json
// ~/.aexos/credentials/api-keys.json
{
  "EXA_API_KEY": "encrypted-value",
  "GITHUB_TOKEN": "encrypted-value"
}
```

---

## Uso Programático

### API de JavaScript

```javascript
const {
  globalDirExists,
  globalConfigExists,
  createGlobalStructure,
  readGlobalConfig,
  addServer,
  removeServer,
  listServers,
} = require('./.aexos-core/core/mcp/global-config-manager');

// Check if setup exists
if (!globalDirExists()) {
  createGlobalStructure();
}

// Add server
addServer('my-server', {
  command: 'npx',
  args: ['-y', 'my-mcp-server'],
  enabled: true,
});

// List servers
const { servers, total, enabled } = listServers();
console.log(`${enabled}/${total} servers enabled`);

// Remove server
removeServer('my-server');
```

### Detección de Sistema Operativo

```javascript
const {
  detectOS,
  isWindows,
  isMacOS,
  isLinux,
  getGlobalMcpDir,
  getGlobalConfigPath,
} = require('./.aexos-core/core/mcp/os-detector');

// Get OS type
console.log(detectOS()); // 'windows' | 'macos' | 'linux'

// Get paths
console.log(getGlobalMcpDir()); // ~/.aexos/mcp/
console.log(getGlobalConfigPath()); // ~/.aexos/mcp/global-config.json
```

---

## Solución de Problemas

### Problemas de Configuración

| Problema           | Solución                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| Permiso denegado   | Ejecutar terminal como Administrador (Windows) o usar sudo (macOS/Linux) |
| Directorio existe  | Usar `aexos mcp setup --force` para recrear                               |
| Ruta no encontrada | Asegurar que el directorio home existe                                   |

### Problemas de Servidor

| Problema                          | Solución                                                          |
| --------------------------------- | ----------------------------------------------------------------- |
| Servidor no inicia                | Verificar comando y args, confirmar que el paquete está instalado |
| Variable de entorno no encontrada | Configurar variable o usar almacenamiento de credenciales         |
| Errores de timeout                | Aumentar timeout en la configuración                              |
| Conexión rechazada                | Verificar URL y acceso de red                                     |

### Problemas Específicos de Windows

| Problema           | Solución                                      |
| ------------------ | --------------------------------------------- |
| NPX no encontrado  | Agregar Node.js al PATH, usar wrapper CMD     |
| Errores de symlink | Habilitar Modo Desarrollador o usar junctions |
| Ruta muy larga     | Habilitar rutas largas en el registro         |

### Soluciones Comunes

```bash
# Reset global config
aexos mcp setup --force

# Clear cache
rm -rf ~/.aexos/mcp/cache/*

# Verify config
aexos mcp status --verbose

# Test server manually
npx -y @modelcontextprotocol/server-github
```

### Problemas con Docker MCP Toolkit

| Problema                            | Solución                                            |
| ----------------------------------- | --------------------------------------------------- |
| Secretos no pasan a contenedores    | Editar archivo de catálogo directamente (ver abajo) |
| Interpolación de plantilla falla    | Usar valores hardcodeados en el catálogo            |
| Herramientas muestran "(N prompts)" | Token no se pasa - aplicar workaround               |

#### Bug de Secretos de Docker MCP (Dic 2025)

**Problema:** El almacén de secretos de Docker MCP Toolkit (`docker mcp secret set`) y la interpolación de plantillas (`{{...}}`) NO funcionan correctamente. Las credenciales no se pasan a los contenedores.

**Síntomas:**

- `docker mcp tools ls` muestra "(N prompts)" en lugar de "(N tools)"
- El servidor MCP inicia pero falla la autenticación
- La salida verbose muestra `-e ENV_VAR` sin valores

**Workaround:** Editar `~/.docker/mcp/catalogs/docker-mcp.yaml` directamente:

```yaml
{ mcp-name }:
  env:
    - name: API_TOKEN
      value: 'actual-token-value-here'
```

**Ejemplo - Apify:**

```yaml
apify-mcp-server:
  env:
    - name: TOOLS
      value: 'actors,docs,apify/rag-web-browser'
    - name: APIFY_TOKEN
      value: 'apify_api_xxxxxxxxxxxxx'
```

**Nota:** Esto expone credenciales en un archivo local. Asegura los permisos del archivo y nunca hagas commit de este archivo.

---

## Integración con IDE

### Claude Desktop

Agregar a la configuración de Claude Desktop:

```json
{
  "mcpServers": {
    "aexos-global": {
      "command": "cyryx",
      "args": ["mcp", "serve", "--global"]
    }
  }
}
```

### VS Code

Configurar en `.vscode/settings.json`:

```json
{
  "cyryx.mcp.useGlobal": true,
  "cyryx.mcp.globalPath": "~/.aexos/mcp/global-config.json"
}
```

### Sobrescritura Específica de Proyecto

Crear `.mcp.json` en la raíz del proyecto para sobrescribir configuraciones globales:

```json
{
  "inherit": "global",
  "servers": {
    "context7": {
      "enabled": false
    },
    "project-specific": {
      "command": "node",
      "args": ["./local-mcp-server.js"]
    }
  }
}
```

---

## Mejores Prácticas

1. **Usar plantillas** para servidores comunes
2. **Almacenar credenciales de forma segura** en el directorio de credenciales
3. **Deshabilitar servidores no usados** para reducir uso de recursos
4. **Mantener servidores actualizados** con las últimas versiones de paquetes
5. **Usar sobrescrituras de proyecto** para necesidades específicas del proyecto
6. **Respaldar configuración** antes de cambios mayores

---

## Documentación Relacionada

- [Arquitectura del Sistema de Módulos](../architecture/module-system.md)
- [Diagramas de Arquitectura MCP](../architecture/mcp-system-diagrams.md)

---

_AEXOS (Cyryx) v4 Guía de Configuración Global de MCP_
