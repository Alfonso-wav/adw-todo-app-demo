import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function formatDueDate(dateStr) {
  if (!dateStr) return null
  const date = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const diff = Math.ceil((date - today) / (1000 * 60 * 60 * 24))

  if (diff < 0) return { text: 'Vencida', className: 'due-overdue' }
  if (diff === 0) return { text: 'Hoy', className: 'due-today' }
  if (diff === 1) return { text: 'Mañana', className: 'due-soon' }
  if (diff <= 3) return { text: `En ${diff} días`, className: 'due-soon' }

  return {
    text: date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
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

  const due = formatDueDate(task.due_date)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-item${isDragging ? ' dragging' : ''}${due && due.className === 'due-overdue' && !task.completed ? ' overdue' : ''}`}
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
        {due && !task.completed && (
          <span className={`task-due ${due.className}`}>{due.text}</span>
        )}
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="btn btn-delete"
        aria-label="Eliminar"
      >
        &times;
      </button>
    </div>
  )
}

export default TaskItem
