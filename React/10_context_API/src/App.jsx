import Input from './components/Input'
import TaskContainer from './components/TaskContainer'

const App = () => {
  return (
    <div className='min-h-screen w-full bg-gray-200 flex items-center justify-center flex-col gap-6'>
      <Input />
      <TaskContainer />
    </div>
  )
}

export default App
