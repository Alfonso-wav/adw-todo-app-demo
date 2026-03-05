import { render, screen, fireEvent } from '@testing-library/react'
import TaskItem from '../components/TaskItem'

vi.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: () => {},
    transform: null,
    transition: null,
    isDragging: false
  })
}))

vi.mock('@dnd-kit/utilities', () => ({
  CSS: {
    Transform: {
      toString: () => undefined
    }
  }
}))

const mockTask = {
  id: 1,
  title: 'Test task',
  completed: false
}

test('renders task with title', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} />)
  expect(screen.getByText('Test task')).toBeInTheDocument()
})

test('shows checked checkbox when task is completed', () => {
  const completedTask = { ...mockTask, completed: true }
  render(<TaskItem task={completedTask} onToggle={() => {}} onDelete={() => {}} />)

  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).toBeChecked()
})

test('calls onToggle when checkbox is clicked', () => {
  const mockToggle = vi.fn()
  render(<TaskItem task={mockTask} onToggle={mockToggle} onDelete={() => {}} />)

  fireEvent.click(screen.getByRole('checkbox'))
  expect(mockToggle).toHaveBeenCalledWith(1)
})

test('calls onDelete when delete button is clicked', () => {
  const mockDelete = vi.fn()
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={mockDelete} />)

  fireEvent.click(screen.getByRole('button', { name: /eliminar/i }))
  expect(mockDelete).toHaveBeenCalledWith(1)
})

test('renders drag handle', () => {
  render(<TaskItem task={mockTask} onToggle={() => {}} onDelete={() => {}} />)
  const handle = document.querySelector('.drag-handle')
  expect(handle).toBeInTheDocument()
})

test('shows overdue label for past due_date', () => {
  const overdueTask = { ...mockTask, due_date: '2020-01-01' }
  render(<TaskItem task={overdueTask} onToggle={() => {}} onDelete={() => {}} />)
  expect(screen.getByText('Vencida')).toBeInTheDocument()
})

test('shows formatted date for future due_date', () => {
  const futureTask = { ...mockTask, due_date: '2030-12-31' }
  render(<TaskItem task={futureTask} onToggle={() => {}} onDelete={() => {}} />)
  const dateBadge = document.querySelector('.task-due')
  expect(dateBadge).toBeInTheDocument()
})

test('does not show due date badge for completed tasks', () => {
  const completedOverdue = { ...mockTask, completed: true, due_date: '2020-01-01' }
  render(<TaskItem task={completedOverdue} onToggle={() => {}} onDelete={() => {}} />)
  expect(screen.queryByText('Vencida')).not.toBeInTheDocument()
  expect(document.querySelector('.task-due')).not.toBeInTheDocument()
})
