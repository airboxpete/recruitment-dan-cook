import MaxWidthWrapper from './MaxWidthWrapper'
import TaskDialog from './TaskDialog'

const NavBar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full bg-[#6C304C] backdrop-blur-lg text-slate-100 transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <h1>Task Manager</h1>

          <div className="hidden items-center space-x-4 sm:flex">
            <TaskDialog />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default NavBar
