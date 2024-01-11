'use client'

import { FC, Suspense } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Task } from '../hooks/useTasks'
import TaskCard from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  status: Task['status']
}

const TaskList: FC<TaskListProps> = ({ tasks, status }) => {
  return (
    <div className="bg-slate-900 p-6 border-slate-700 rounded-md">
      <h2 className="text-2xl font-semibold capitalize text-slate-100">{status}</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <ScrollArea className="h-[90%]">
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
        </ScrollArea>
      </Suspense>
    </div>
  )
}

export default TaskList
