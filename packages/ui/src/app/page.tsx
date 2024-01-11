import TaskBoard from './components/TaskBoard'

export default async function Home() {
  return (
    <main className="flex max-h-[800px] px-12 py-4">
      <TaskBoard />
    </main>
  )
}
