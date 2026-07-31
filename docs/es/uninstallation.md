<!--
  Traducción: ES
  Original: /docs/en/uninstallation.md
  Última sincronización: 2026-01-26
-->

# Guía de Desinstalación

> 🌐 [EN](../uninstallation.md) | [PT](../pt/uninstallation.md) | **ES**

---

Esta guía proporciona instrucciones completas para desinstalar AEXOS (Cyryx) de su sistema.

## Tabla de Contenidos

1. [Antes de Desinstalar](#antes-de-desinstalar)
2. [Desinstalación Rápida](#desinstalación-rápida)
3. [Desinstalación Completa](#desinstalación-completa)
4. [Desinstalación Selectiva](#desinstalación-selectiva)
5. [Preservación de Datos](#preservación-de-datos)
6. [Eliminación Limpia del Sistema](#eliminación-limpia-del-sistema)
7. [Resolución de Problemas de Desinstalación](#resolución-de-problemas-de-desinstalación)
8. [Limpieza Post-Desinstalación](#limpieza-post-desinstalación)
9. [Reinstalación](#reinstalación)

## Antes de Desinstalar

### Consideraciones Importantes

⚠️ **Advertencia**: Desinstalar AEXOS (Cyryx):

- Eliminará todos los archivos del framework
- Borrará configuraciones de agentes (a menos que se preserven)
- Limpiará datos de la capa de memoria (a menos que se respalden)
- Eliminará todos los flujos de trabajo personalizados
- Borrará logs y archivos temporales

### Checklist Pre-Desinstalación

- [ ] Respaldar datos importantes
- [ ] Exportar agentes y flujos de trabajo personalizados
- [ ] Guardar claves API y configuraciones
- [ ] Documentar modificaciones personalizadas
- [ ] Detener todos los procesos en ejecución
- [ ] Informar a los miembros del equipo

### Respalde Sus Datos

```bash
# Crear respaldo completo
npx github:CyryxLabs/AEXOS backup --complete

# O respaldar manualmente directorios importantes
tar -czf aexos-backup-$(date +%Y%m%d).tar.gz \
  .aexos/ \
  agents/ \
  workflows/ \
  tasks/ \
  --exclude=.aexos/logs \
  --exclude=.aexos/cache
```

## Desinstalación Rápida

### Usando el Desinstalador Incorporado

La forma más rápida de desinstalar AEXOS (Cyryx):

```bash
# Desinstalación básica (preserva datos de usuario)
npx github:CyryxLabs/AEXOS uninstall

# Desinstalación completa (elimina todo)
npx github:CyryxLabs/AEXOS uninstall --complete

# Desinstalación con preservación de datos
npx github:CyryxLabs/AEXOS uninstall --keep-data
```

### Desinstalación Interactiva

Para desinstalación guiada:

```bash
npx github:CyryxLabs/AEXOS uninstall --interactive
```

Esto le preguntará:

- Qué mantener/eliminar
- Opciones de respaldo
- Confirmación para cada paso

## Desinstalación Completa

### Paso 1: Detener Todos los Servicios

```bash
# Detener todos los agentes en ejecución
*deactivate --all

# Detener todos los flujos de trabajo
*stop-workflow --all

# Apagar meta-agent
*shutdown
```

### Paso 2: Exportar Datos Importantes

```bash
# Exportar configuraciones
*export config --destination backup/config.json

# Exportar agentes
*export agents --destination backup/agents/

# Exportar flujos de trabajo
*export workflows --destination backup/workflows/

# Exportar datos de memoria
*export memory --destination backup/memory.zip
```

### Paso 3: Ejecutar el Desinstalador

```bash
# Eliminación completa
npx github:CyryxLabs/AEXOS uninstall --complete --no-backup
```

### Paso 4: Eliminar Instalación Global

```bash
# Eliminar paquete npm global
npm uninstall -g aexos-core

# Eliminar cache de npx
npm cache clean --force
```

### Paso 5: Limpiar Archivos del Sistema

#### Windows

```powershell
# Eliminar archivos de AppData
Remove-Item -Recurse -Force "$env:APPDATA\aexos-core"

# Eliminar archivos temporales
Remove-Item -Recurse -Force "$env:TEMP\aexos-*"

# Eliminar entradas del registro (si las hay)
Remove-Item -Path "HKCU:\Software\AEXOS (Cyryx)" -Recurse
```

#### macOS/Linux

```bash
# Eliminar archivos de configuración
rm -rf ~/.aexos
rm -rf ~/.config/aexos-core

# Eliminar cache
rm -rf ~/.cache/aexos-core

# Eliminar archivos temporales
rm -rf /tmp/aexos-*
```

## Desinstalación Selectiva

### Eliminar Componentes Específicos

```bash
# Eliminar solo agentes
npx github:CyryxLabs/AEXOS uninstall agents

# Eliminar solo flujos de trabajo
npx github:CyryxLabs/AEXOS uninstall workflows

# Eliminar capa de memoria
npx github:CyryxLabs/AEXOS uninstall memory-layer

# Eliminar agente específico
*uninstall agent-name
```

### Mantener Core, Eliminar Extensiones

```bash
# Eliminar todos los plugins
*plugin remove --all

# Eliminar Squads
rm -rf Squads/

# Eliminar plantillas personalizadas
rm -rf templates/custom/
```

## Preservación de Datos

### Qué Mantener

Antes de desinstalar, identifique lo que desea preservar:

1. **Agentes Personalizados**

   ```bash
   # Copiar agentes personalizados
   cp -r agents/custom/ ~/aexos-backup/agents/
   ```

2. **Flujos de Trabajo y Tareas**

   ```bash
   # Copiar flujos de trabajo
   cp -r workflows/ ~/aexos-backup/workflows/
   cp -r tasks/ ~/aexos-backup/tasks/
   ```

3. **Datos de Memoria**

   ```bash
   # Exportar base de datos de memoria
   *memory export --format sqlite \
     --destination ~/aexos-backup/memory.db
   ```

4. **Configuraciones**

   ```bash
   # Copiar todos los archivos de configuración
   cp .aexos/config.json ~/aexos-backup/
   cp .env ~/aexos-backup/
   ```

5. **Código Personalizado**
   ```bash
   # Encontrar y respaldar archivos personalizados
   find . -name "*.custom.*" -exec cp {} ~/aexos-backup/custom/ \;
   ```

### Script de Preservación

Crear `preserve-data.sh`:

```bash
#!/bin/bash
BACKUP_DIR="$HOME/aexos-backup-$(date +%Y%m%d-%H%M%S)"

echo "Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Función de respaldo
backup_if_exists() {
    if [ -e "$1" ]; then
        echo "Backing up $1..."
        cp -r "$1" "$BACKUP_DIR/"
    fi
}

# Respaldar todos los datos importantes
backup_if_exists ".aexos"
backup_if_exists "agents"
backup_if_exists "workflows"
backup_if_exists "tasks"
backup_if_exists "templates"
backup_if_exists ".env"
backup_if_exists "package.json"

echo "Backup completed at: $BACKUP_DIR"
```

## Eliminación Limpia del Sistema

### Script de Limpieza Completa

Crear `clean-uninstall.sh`:

```bash
#!/bin/bash
echo "AEXOS (Cyryx) Complete Uninstall"
echo "================================="

# Confirmación
read -p "This will remove ALL AEXOS (Cyryx) data. Continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

# Detener todos los procesos
echo "Stopping all processes..."
pkill -f "aexos-core" || true
pkill -f "aexos-developer" || true

# Eliminar archivos del proyecto
echo "Removing project files..."
rm -rf .aexos/
rm -rf agents/
rm -rf workflows/
rm -rf tasks/
rm -rf templates/
rm -rf Squads/
rm -rf node_modules/aexos-core/

# Eliminar archivos globales
echo "Removing global files..."
npm uninstall -g aexos-core

# Eliminar datos de usuario
echo "Removing user data..."
rm -rf ~/.aexos
rm -rf ~/.config/aexos-core
rm -rf ~/.cache/aexos-core

# Limpiar cache de npm
echo "Cleaning npm cache..."
npm cache clean --force

# Eliminar de package.json
echo "Updating package.json..."
npm uninstall aexos-core/core
npm uninstall aexos-core/memory
npm uninstall aexos-core/meta-agent

echo "Uninstall complete!"
```

### Limpieza del Registro (Windows)

```powershell
# Script PowerShell para limpieza de Windows
Write-Host "Cleaning AEXOS (Cyryx) from Windows Registry..."

# Eliminar del PATH
$path = [Environment]::GetEnvironmentVariable("PATH", "User")
$newPath = ($path.Split(';') | Where-Object { $_ -notmatch 'aexos-core' }) -join ';'
[Environment]::SetEnvironmentVariable("PATH", $newPath, "User")

# Eliminar claves del registro
Remove-ItemProperty -Path "HKCU:\Environment" -Name "AEXOS_*" -ErrorAction SilentlyContinue

# Eliminar asociaciones de archivos
Remove-Item -Path "HKCU:\Software\Classes\.cyryx" -Recurse -ErrorAction SilentlyContinue

Write-Host "Registry cleanup complete!"
```

## Resolución de Problemas de Desinstalación

### Problemas Comunes

#### 1. Permiso Denegado

```bash
# Linux/macOS
sudo npx github:CyryxLabs/AEXOS uninstall --complete

# Windows (Ejecutar como Administrador)
npx github:CyryxLabs/AEXOS uninstall --complete
```

#### 2. Proceso Todavía en Ejecución

```bash
# Forzar detención de todos los procesos
# Linux/macOS
killall -9 node
killall -9 aexos-core

# Windows
taskkill /F /IM node.exe
taskkill /F /IM aexos-core.exe
```

#### 3. Archivos Bloqueados

```bash
# Encontrar procesos usando archivos
# Linux/macOS
lsof | grep cyryx

# Windows (PowerShell)
Get-Process | Where-Object {$_.Path -like "*cyryx*"}
```

#### 4. Eliminación Incompleta

```bash
# Limpieza manual
find . -name "*cyryx*" -type d -exec rm -rf {} +
find . -name "*.cyryx*" -type f -delete
```

### Desinstalación Forzada

Si la desinstalación normal falla:

```bash
#!/bin/bash
# force-uninstall.sh
echo "Force uninstalling AEXOS (Cyryx)..."

# Matar todos los procesos relacionados
pkill -9 -f cyryx || true

# Eliminar todos los archivos
rm -rf .cyryx* cyryx* *cyryx*
rm -rf agents workflows tasks templates
rm -rf node_modules/aexos-core
rm -rf ~/.cyryx* ~/.config/cyryx* ~/.cache/cyryx*

# Limpiar npm
npm cache clean --force
npm uninstall -g aexos-core

echo "Force uninstall complete!"
```

## Limpieza Post-Desinstalación

### 1. Verificar Eliminación

```bash
# Buscar archivos restantes
find . -name "*cyryx*" 2>/dev/null
find ~ -name "*cyryx*" 2>/dev/null

# Verificar paquetes npm
npm list -g | grep cyryx
npm list | grep cyryx

# Verificar procesos en ejecución
ps aux | grep cyryx
```

### 2. Limpiar Variables de Entorno

```bash
# Eliminar de .bashrc/.zshrc
sed -i '/AEXOS_/d' ~/.bashrc
sed -i '/aexos-core/d' ~/.bashrc

# Eliminar de archivos .env
find . -name ".env*" -exec sed -i '/AEXOS_/d' {} \;
```

### 3. Actualizar Archivos del Proyecto

```javascript
// Eliminar de los scripts de package.json
{
  "scripts": {
    // Eliminar estas entradas
    "cyryx": "aexos-core",
    "meta-agent": "aexos-core meta-agent"
  }
}
```

### 4. Limpiar Repositorio Git

```bash
# Eliminar hooks de git específicos de AEXOS
rm -f .git/hooks/*cyryx*

# Actualizar .gitignore
sed -i '/.aexos/d' .gitignore
sed -i '/aexos-/d' .gitignore

# Commit de eliminación
git add -A
git commit -m "Remove AEXOS (Cyryx)"
```

## Reinstalación

### Después de Desinstalación Completa

Si desea reinstalar AEXOS (Cyryx):

1. **Esperar la limpieza**

   ```bash
   # Asegurar que todos los procesos se detuvieron
   sleep 5
   ```

2. **Limpiar cache de npm**

   ```bash
   npm cache clean --force
   ```

3. **Instalación fresca**
   ```bash
   npx github:CyryxLabs/AEXOS init my-project
   ```

### Restaurar desde Respaldo

```bash
# Restaurar datos guardados
cd my-project

# Restaurar configuraciones
cp ~/aexos-backup/config.json .aexos/

# Restaurar agentes
cp -r ~/aexos-backup/agents/* ./agents/

# Importar memoria
*memory import ~/aexos-backup/memory.zip

# Verificar restauración
*doctor --verify-restore
```

## Checklist de Verificación de Desinstalación

- [ ] Todos los procesos AEXOS detenidos
- [ ] Archivos del proyecto eliminados
- [ ] Paquete npm global desinstalado
- [ ] Archivos de configuración de usuario eliminados
- [ ] Directorios de cache limpiados
- [ ] Variables de entorno eliminadas
- [ ] Entradas del registro limpiadas (Windows)
- [ ] Repositorio Git actualizado
- [ ] No se encontraron archivos AEXOS restantes
- [ ] PATH del sistema actualizado

## Obtener Ayuda

Si encuentra problemas durante la desinstalación:

1. **Consultar Documentación**
   - [FAQ](https://github.com/CyryxLabs/AEXOS/wiki/faq#uninstall)
   - [Solución de Problemas](https://github.com/CyryxLabs/AEXOS/wiki/troubleshooting)

2. **Soporte de la Comunidad**
   - Discord: #uninstall-help
   - GitHub Issues: Etiquetar con "uninstall"

3. **Soporte de Emergencia**
   ```bash
   # Generar reporte de desinstalación
   npx github:CyryxLabs/AEXOS diagnose --uninstall > uninstall-report.log
   ```

---

**Recuerde**: Siempre respalde sus datos antes de desinstalar. El proceso de desinstalación es irreversible, y la recuperación de datos puede no ser posible sin respaldos adecuados.
