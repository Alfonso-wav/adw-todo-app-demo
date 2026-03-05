# Feature: Fondo negro de la aplicación (Dark Theme)

**ADW ID:** 4
**Fecha:** 2026-03-05
**Especificacion:** .issues/4/plan.md

## Overview

Se implementó un tema oscuro completo para la aplicación Todo List, cambiando el fondo de gris claro (`#f5f5f5`) a negro puro (`#000000`). Todos los colores de texto, elementos de interfaz y componentes interactivos fueron adaptados para mantener legibilidad y contraste adecuados sobre el fondo oscuro.

## Que se Construyo

- Fondo de página negro (`#000000`) con texto claro (`#e0e0e0`)
- Tarjeta principal `.app` con fondo gris muy oscuro (`#1a1a1a`)
- Input de tareas adaptado para tema oscuro con fondo `#2a2a2a`
- Items de tarea con fondo oscuro (`#222222`) y bordes sutiles (`#333`)
- Títulos y textos secundarios recoloreados para contraste en oscuro
- Estado "dragging" de items actualizado para tema oscuro
- Handle de arrastre adaptado con colores de oscuro a claro en hover

## Implementacion Tecnica

### Ficheros Modificados

- `frontend/src/index.css`: Único fichero modificado. Se actualizaron 17 valores de color distribuidos en múltiples selectores CSS para implementar el tema oscuro completo.

### Cambios Clave

1. **Body**: `background-color` cambiado de `#f5f5f5` → `#000000`; `color` de `#333` → `#e0e0e0`
2. **Tarjeta .app**: `background-color` de `white` → `#1a1a1a`; `box-shadow` aumentada a `rgba(0,0,0,0.3)` para visibilidad en oscuro
3. **Input (.task-input)**: Añadidos `background-color: #2a2a2a` y `color: #e0e0e0`; borde actualizado de `#ddd` → `#444`
4. **Task items**: `background-color` de `#f9f9f9` → `#222222`; borde de `#eee` → `#333`; estado dragging de `#f0f0f0` → `#2a2a2a`
5. **Textos**: `h1` de `#2c3e50` → `#ffffff`; `p` de `#666` → `#aaa`; `.task-title` de `#333` → `#e0e0e0`; `.task-title.completed` y `.empty-message` de `#999` → `#666`

## Como Usar

La funcionalidad es automática y no requiere interacción del usuario:

1. Abre la aplicación en el navegador
2. El fondo negro y tema oscuro se aplica globalmente de forma inmediata
3. Todos los elementos de UI (input, lista de tareas, botones) se muestran con el nuevo esquema de colores oscuros

## Configuracion

No requiere configuración adicional. Los cambios son puramente CSS y se aplican automáticamente al cargar la aplicación.

## Testing

Los tests existentes del frontend cubren la funcionalidad sin necesidad de tests nuevos:

```bash
cd frontend && npm test
```

Los cambios son exclusivamente visuales (CSS), por lo que los tests de comportamiento existentes siguen siendo válidos. Se recomienda verificar visualmente:
- Contraste del texto sobre fondo oscuro
- Legibilidad del placeholder en el input
- Visibilidad de tareas completadas (texto tachado)
- Contraste de botones de acción

## Notas

- Los colores de acento se mantienen sin cambios: azul `#3498db` (focus del input y botón primario) y rojo `#e74c3c` (botón eliminar), ya que funcionan correctamente sobre fondos oscuros.
- No se modificaron componentes React ni código de backend.
- No se añadieron dependencias nuevas.
- El color de `color: #666` para `.task-title.completed` garantiza que las tareas completadas sean distinguibles del texto normal sin perder legibilidad.
