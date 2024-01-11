import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FC, useEffect } from 'react'
import { Task, useDeleteTask } from '../hooks/useTasks'
import TaskDialog from './TaskDialog'
import { TrashIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

interface TaskCardProps {
  task: Task
}

const getReadableTaskSize = (size: Task['size']) => {
  switch (size) {
    case 'xs':
      return 'Extra Small'
    case 's':
      return 'Small'
    case 'm':
      return 'Medium'
    case 'l':
      return 'Large'
    case 'xl':
      return 'Extra Large'
    default:
      return 'Unknown'
  }
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const { error, mutate, isPending } = useDeleteTask()
  const { toast } = useToast()

  const handleDeleteClick = () => mutate(task)

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      })
    }
  }, [error, toast])

  return (
    <Card className="p-2 m-3 w-[90%] bg-[#23272A] text-[#B0BAC9] border-none">
      <CardHeader className="p-0 m-0 mb-2">
        <CardTitle className="text-sm flex justify-between">
          {task.summary}
          <div className="flex">
            <TaskDialog task={task} />
            <TrashIcon
              className={cn('ml-1.5 h-4 w-4 hover:cursor-pointer', isPending && 'pointer-events-none')}
              onClick={handleDeleteClick}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm p-0 m-0">{task.description}</CardContent>
      <CardFooter className="p-0 m-0">
        <p className="w-full text-right text-xs">{getReadableTaskSize(task.size)}</p>
      </CardFooter>
    </Card>
  )
}

export default TaskCard
