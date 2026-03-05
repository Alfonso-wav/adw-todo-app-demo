# Feature: Cambiar título de la aplicación de 'Todo' a '2Do'

**ADW ID:** 45631491
**Fecha:** 2026-03-05
**Especificacion:** /mnt/c/Users/amassaguer/Documents/CODE/adw-todo-app-demo/trees/issue-3/.issues/3/plan.md

## Overview

Se actualizó el título y encabezado principal de la aplicación de "Todo List" a "2Do List" para reflejar una identidad visual más distintiva y moderna. El cambio afecta tanto la pestaña del navegador (título HTML) como el encabezado visible de la aplicación (`<h1>`).

## Que se Construyo

- Actualización del título del documento HTML (`<title>`) en `index.html`
- Actualización del encabezado principal (`<h1>`) en el componente raíz `App.jsx`
- Actualización del test unitario para reflejar el nuevo título "2Do List"

## Implementacion Tecnica

### Ficheros Modificados

- `frontend/index.html`: Cambiado `<title>Todo List</title>` por `<title>2Do List</title>`
- `frontend/src/App.jsx`: Cambiado `<h1>Todo List</h1>` por `<h1>2Do List</h1>`
- `frontend/src/__tests__/App.test.jsx`: Actualizado test name y matcher de `/todo list/i` a `/2do list/i`

### Cambios Clave

- Cambio puramente cosmético/textual sin impacto en lógica de negocio
- El título del navegador (pestaña) ahora muestra "2Do List" para todos los usuarios
- El encabezado `<h1>` visible en la UI ahora muestra "2Do List"
- El test existente `renders Todo List heading` fue renombrado a `renders 2Do List heading` y actualizado para buscar el nuevo texto
- No se introdujeron nuevas dependencias ni cambios en el backend

## Como Usar

La funcionalidad es transparente para el usuario:

1. Abrir la aplicación en el navegador
2. La pestaña del navegador mostrará "2Do List"
3. El encabezado principal de la página mostrará "2Do List"

## Configuracion

No se requiere configuración adicional. El cambio es estático.

## Testing

Ejecutar los tests del frontend para validar el cambio:

```bash
cd frontend && npm test
```

El test `renders 2Do List heading` verifica que el encabezado `<h1>` con el texto "2Do List" está presente en el DOM.

## Notas

- No se requieren nuevas dependencias
- El cambio no afecta al backend ni a la API
- No hay casos límite relevantes para un cambio de texto estático
- Si en el futuro se desea cambiar el título nuevamente, modificar `frontend/index.html` y `frontend/src/App.jsx` y actualizar el test correspondiente
