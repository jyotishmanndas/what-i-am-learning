import Input from './components/Input'
import TaskContainer from './components/TaskContainer'

const App = () => {
  return (
    <div className='min-h-screen w-full bg-white flex items-center justify-center flex-col gap-8 p-4'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-black mb-2'>Task Master</h1>
        <p className='text-gray-500 text-sm'>Keep it simple, stay organized</p>
      </div>
      <Input />
      <TaskContainer />
    </div>
  )
}

export default App
