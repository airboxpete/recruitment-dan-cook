'use client'

import TaskList from './TaskList'
import { useTasks } from '../hooks/useTasks'

const TaskBoard = () => {
  const { data } = useTasks()

  return (
    <div className="max-w-full min-h-[600px] max-h-[900px] min-w-[1000px] p-2 sm:px-12 grid grid-rows-3 sm:grid-rows-1 sm:grid-cols-3 gap-6">
      <TaskList tasks={data?.tasks} status="todo" />
      <TaskList tasks={data?.tasks} status="doing" />
      <TaskList tasks={data?.tasks} status="done" />
    </div>
  )
}

export default TaskBoard
