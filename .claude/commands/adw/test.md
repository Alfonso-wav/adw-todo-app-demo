---
description: Ejecuta la suite de tests de la aplicación y devuelve resultados en JSON
allowed-tools:
  - Bash
---

# Suite de Validación de la Aplicación

Ejecuta tests de validación completos para los componentes frontend y backend, devolviendo resultados en formato JSON estandarizado para procesamiento automatizado.

## Propósito

Identificar y corregir proactivamente problemas en la aplicación antes de que afecten a usuarios o desarrolladores:
- Detectar errores de sintaxis, fallos de tipos y errores de importación
- Identificar tests rotos o vulnerabilidades de seguridad
- Verificar procesos de build y dependencias
- Asegurar que la aplicación está en un estado saludable

## Variables

TEST_COMMAND_TIMEOUT: 5 minutos
LOG_DIR: $ARGUMENTS

## Instrucciones

- Ejecuta cada test en la secuencia proporcionada abajo
- Captura el resultado (passed/failed) y cualquier mensaje de error
- IMPORTANTE: Devuelve SOLO el array JSON con los resultados de los tests
  - IMPORTANTE: No incluyas texto adicional, explicaciones ni formato markdown
  - Ejecutaremos JSON.parse() directamente sobre la salida, así que asegúrate de que sea JSON válido
- Si un test pasa, omite el campo error
- Si un test falla, incluye el mensaje de error en el campo error
- Gestión de Errores:
  - Si un comando devuelve código de salida distinto de cero, márcalo como fallido y para inmediatamente
  - Captura la salida de stderr para el campo error
  - Timeout de comandos después de `TEST_COMMAND_TIMEOUT`
  - IMPORTANTE: Si un test falla, para de procesar tests y devuelve los resultados obtenidos hasta el momento
- El orden de ejecución de los tests es importante - las dependencias deben validarse primero
- Todas las rutas de ficheros son relativas a la raíz del proyecto
- Ejecuta siempre `pwd` y `cd` antes de cada test para asegurarte de que operas en el directorio correcto
- Persistencia de outputs en LOG_DIR:
  - Si LOG_DIR está definido (no vacío), guarda la salida raw de cada comando en `$LOG_DIR/{test_name}_output.txt` usando `tee` para conservar el exit code: `{ cmd 2>&1; } | tee "$LOG_DIR/{test_name}_output.txt"; exit ${PIPESTATUS[0]}`
  - Si un test falla y existe el fichero de salida, incluye la ruta en el campo error: `"output_file: $LOG_DIR/{test_name}_output.txt\n{resumen_del_error}"`

## Secuencia de Ejecución de Tests

### Tests del Backend

1. **Comprobación de Sintaxis Ruby**
   - Comando de Preparación: Ninguno
   - Comando: `cd backend && find app config lib -name '*.rb' 2>/dev/null | xargs -I {} ruby -c {} 2>&1`
   - test_name: "ruby_syntax_check"
   - test_purpose: "Valida la sintaxis Ruby comprobando los ficheros fuente, detectando errores de sintaxis como end faltantes, sintaxis inválida o sentencias malformadas"

2. **Todos los Tests del Backend**
   - Comando de Preparación: Ninguno
   - Comando: `cd backend && bin/rails test`
   - test_name: "all_backend_tests"
   - test_purpose: "Valida toda la funcionalidad del backend incluyendo modelos, controladores y tests de integración"

### Tests del Frontend

3. **Todos los Tests del Frontend**
   - Comando de Preparación: Ninguno
   - Comando: `cd frontend && npm test -- --run`
   - test_name: "all_frontend_tests"
   - test_purpose: "Valida toda la funcionalidad del frontend incluyendo componentes, hooks y utilidades"

## Reporte

- IMPORTANTE: Devuelve resultados exclusivamente como un array JSON basado en la sección `Estructura de Salida` de abajo.
- Ordena el array JSON con los tests fallidos (passed: false) arriba
- Incluye todos los tests en la salida, tanto pasados como fallidos
- El campo execution_command debe contener el comando exacto que puede ejecutarse para reproducir el test
- Esto permite a agentes posteriores identificar y resolver errores rápidamente

### Estructura de Salida

```json
[
  {
    "test_name": "string",
    "passed": boolean,
    "execution_command": "string",
    "test_purpose": "string",
    "error": "optional string"
  },
  ...
]
```

### Ejemplo de Salida

```json
[
  {
    "test_name": "all_backend_tests",
    "passed": false,
    "execution_command": "cd backend && bin/rails test",
    "test_purpose": "Valida toda la funcionalidad del backend incluyendo modelos, controladores y tests de integración",
    "error": "TaskTest#test_should_create_task: Expected response to be a <2XX: success>, but was a <422: Unprocessable Entity>"
  },
  {
    "test_name": "ruby_syntax_check",
    "passed": true,
    "execution_command": "cd backend && find app config lib -name '*.rb' 2>/dev/null | xargs -I {} ruby -c {} 2>&1",
    "test_purpose": "Valida la sintaxis Ruby comprobando los ficheros fuente"
  }
]
```
