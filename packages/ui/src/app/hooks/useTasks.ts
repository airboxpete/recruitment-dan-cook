import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const fetchTasks = async () => {
  const res = await fetch('http://localhost:8000/tasks')
  return await res.json()
}

const createTask = (task: NewTask) => {
  return fetch('http://localhost:8000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then((res) => res.json())
}

const updateTask = async (task: Task) => {
  const res = await fetch(`http://localhost:8000/tasks/${task._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  return await res.json()
}

const deleteTask = async (task: Task) => {
  const res = await fetch(`http://localhost:8000/tasks/${task._id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete task')
  }

  return res.json()
}

export interface Task {
  _id: string
  summary: string
  description?: string
  status: 'todo' | 'doing' | 'done'
  size: 'xs' | 's' | 'm' | 'l' | 'xl'
}

export type NewTask = Omit<Task, '_id'>

export const useTasks = () => {
  const { data, error, isFetching } = useQuery<{ tasks: Task[] }>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    initialData: { tasks: [] },
  })

  return { data, error, isFetching }
}

const useMutateTask = <T>(key: string, mutationFn: (task: T) => Promise<Task>) => {
  const queryClient = useQueryClient()
  const { error, mutate, isPending, isSuccess } = useMutation({
    mutationKey: [key],
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return { mutate, isPending, isSuccess, error }
}

export const useCreateTask = () => useMutateTask('createTask', createTask)
export const useUpdateTask = () => useMutateTask('updateTask', updateTask)
export const useDeleteTask = () => useMutateTask('deleteTask', deleteTask)
