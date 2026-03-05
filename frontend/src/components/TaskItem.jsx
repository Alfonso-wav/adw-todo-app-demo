import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function formatDueDate(dueDateStr) {
  if (!dueDateStr) return null

  const [year, month, day] = dueDateStr.split('-').map(Number)
  const due = new Date(year, month - 1, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const diffMs = due - today
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return { label: 'Vencida', className: 'due-overdue' }
  if (diffDays === 0) return { label: 'Hoy', className: 'due-today' }
  if (diffDays === 1) return { label: 'Mañana', className: 'due-soon' }
  if (diffDays <= 7) return { label: `En ${diffDays} días`, className: 'due-soon' }

  return {
    label: due.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
    className: 'due-normal'
  }
}

function TaskItem({ task, onToggle, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const dueDateInfo = !task.completed ? formatDueDate(task.due_date) : null

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-item${isDragging ? ' dragging' : ''}${dueDateInfo?.className === 'due-overdue' ? ' overdue' : ''}`}
      {...attributes}
    >
      <span className="drag-handle" {...listeners}>⠿</span>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
      />
      <div className="task-content">
        <span className={task.completed ? 'task-title completed' : 'task-title'}>
          {task.title}
        </span>
        {dueDateInfo && (
          <span className={`task-due ${dueDateInfo.className}`}>
            {dueDateInfo.label}
          </span>
        )}
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="btn btn-delete"
      >
        Eliminar
      </button>
    </div>
  )
}

export default TaskItem
