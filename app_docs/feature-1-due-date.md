# Feature: Fecha Límite en Tareas (Due Date)

**ADW ID:** 1
**Fecha:** 2026-03-05
**Especificacion:** .issues/1/plan.md

## Overview

Se añade soporte para fechas límite opcionales en las tareas de la aplicación Todo List. Los usuarios pueden asignar una fecha límite al crear una tarea y visualizarla con etiquetas contextuales (Vencida, Hoy, Mañana, En X días) y estilos diferenciados según urgencia.

## Que se Construyo

- Campo `due_date` (date, nullable) en el modelo y base de datos de tareas
- Migración de base de datos para añadir la columna `due_date` a la tabla tasks
- Input de tipo date en el formulario de creación de tareas
- Función `formatDueDate` en TaskItem con lógica contextual de visualización
- Etiquetas visuales con colores según urgencia (rojo, naranja, amarillo, gris)
- Borde rojo izquierdo en tareas vencidas no completadas
- Ocultación de etiqueta de fecha en tareas completadas
- Envío de `due_date` desde el frontend al crear tareas
- Tests unitarios y de integración en backend y frontend

## Implementacion Tecnica

### Ficheros Modificados

- `backend/db/migrate/20260305000000_add_due_date_to_tasks.rb`: Nueva migración que añade columna `due_date` de tipo date (nullable) a la tabla tasks
- `backend/app/models/task.rb`: Anotación de schema actualizada con el nuevo campo `due_date`
- `backend/app/controllers/api/tasks_controller.rb`: `due_date` añadido a `task_params` para permitir su asignación masiva
- `backend/db/schema.rb`: Schema actualizado con la columna `due_date`
- `backend/test/fixtures/tasks.yml`: Fixtures actualizados con valores de `due_date` (futura, pasada, nil)
- `backend/test/models/task_test.rb`: Tests para validar que `due_date` es opcional y se almacena correctamente
- `backend/test/controllers/api/tasks_controller_test.rb`: Tests para crear/actualizar tareas con `due_date` y verificar que se devuelve en el index
- `frontend/src/services/api.js`: `createTask` acepta `dueDate` como segundo parámetro y lo envía como `due_date` si está presente
- `frontend/src/components/TaskForm.jsx`: Añadido estado `dueDate` y input de tipo date en el formulario
- `frontend/src/components/TaskItem.jsx`: Función `formatDueDate` y renderizado de etiqueta contextual; borde rojo para overdue
- `frontend/src/index.css`: Nuevas clases CSS para `.task-date-input`, `.task-content`, `.task-due`, `.due-overdue`, `.due-today`, `.due-soon`, `.due-normal`, `.task-item.overdue`
- `frontend/src/__tests__/TaskForm.test.jsx`: Tests actualizados para verificar llamada con `(title, null)` y renderizado del input de fecha
- `frontend/src/__tests__/TaskItem.test.jsx`: Tests para fecha futura, fecha pasada ("Vencida") y tarea completada sin etiqueta

### Cambios Clave

1. **Base de datos**: Columna `due_date` nullable añadida via migración; retrocompatible con tareas existentes
2. **API permitting**: `due_date` añadido a `task_params` para que el controlador lo acepte en create/update
3. **Lógica contextual**: `formatDueDate` en TaskItem calcula la diferencia en días desde hoy y retorna label y clase CSS apropiados, ignorando horas para comparaciones precisas de fecha
4. **Visualización condicional**: La etiqueta de fecha solo se muestra en tareas no completadas; el borde rojo solo aplica a tareas vencidas no completadas
5. **Input nativo**: Se usa `<input type="date">` nativo del navegador, sin dependencias externas

## Como Usar

1. Abrir la aplicación Todo List
2. En el formulario de nueva tarea, escribir el título
3. Opcionalmente seleccionar una fecha límite con el selector de fecha
4. Hacer clic en "Añadir" — la tarea aparece en la lista con su etiqueta de fecha
5. La etiqueta muestra: **Vencida** (rojo), **Hoy** (naranja), **Mañana** (amarillo), **En X días** (amarillo), o la fecha formateada (gris)
6. Las tareas vencidas no completadas muestran un borde rojo izquierdo
7. Al marcar una tarea como completada, la etiqueta de fecha desaparece

## Configuracion

No requiere configuración adicional. El campo `due_date` es completamente opcional (nullable). No se añadieron nuevas gemas Ruby ni paquetes npm.

## Testing

```bash
# Backend
cd backend && bin/rails db:migrate
cd backend && bin/rails test

# Frontend
cd frontend && npm test
```

Casos cubiertos:
- Tarea sin fecha límite (due_date nil) — no muestra etiqueta
- Tarea con fecha pasada (vencida) — muestra "Vencida" en rojo con borde
- Tarea con fecha hoy — muestra "Hoy" en naranja
- Tarea con fecha mañana — muestra "Mañana" en amarillo
- Tarea completada con fecha vencida — no muestra etiqueta de fecha

## Notas

- La función `formatDueDate` construye el objeto `Date` parseando manualmente el string `YYYY-MM-DD` para evitar problemas de zona horaria con `new Date(string)` que interpreta como UTC
- Los indicadores visuales solo aplican a tareas no completadas para evitar ruido visual
- La API de formato usa locale `es-ES` para mostrar fechas en español
