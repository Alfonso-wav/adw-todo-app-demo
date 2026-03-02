---
description: Corrige un test fallido específico usando los detalles del fallo proporcionados
allowed-tools:
  - Bash
  - Read
  - Glob
  - Grep
  - Edit
  - Write
---

# Resolver Test Fallido

Corrige un test específico que está fallando usando los detalles del fallo proporcionados.

## Instrucciones

1. **Analizar el Fallo del Test**
   - Revisa el nombre del test, su propósito y el mensaje de error del `Datos del Fallo`
   - Entiende qué está intentando validar el test
   - Identifica la causa raíz a partir de los detalles del error

2. **Descubrimiento de Contexto**
   - Comprueba los cambios recientes: `git diff origin/main --stat --name-only`
   - Céntrate solo en los ficheros que podrían afectar a este test específico

3. **Reproducir el Fallo**
   - IMPORTANTE: Usa el `execution_command` proporcionado en los datos del test
   - Ejecútalo para ver la salida completa del error y la traza de la pila
   - Confirma que puedes reproducir el fallo exacto

4. **Corregir el Problema**
   - Haz cambios mínimos y dirigidos para resolver solo este fallo de test
   - Asegúrate de que la corrección se alinea con el propósito del test
   - No modifiques código ni tests no relacionados

5. **Validar la Corrección**
   - Vuelve a ejecutar el mismo `execution_command` para confirmar que el test ahora pasa
   - NO ejecutes otros tests ni la suite completa
   - Céntrate solo en corregir este test específico

## Datos del Fallo

$ARGUMENTS

## Reporte

Proporciona un resumen conciso de:
- Causa raíz identificada
- Corrección específica aplicada
- Confirmación de que el test ahora pasa
