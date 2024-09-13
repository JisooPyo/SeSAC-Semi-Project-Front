import './App.css'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import Member from './components/Member'

function App() {
  return (
    <>
      <div>
        <h1>To-Do List</h1>
        <div>
          <Member />
        </div>
        <div className="container">
          <div className='item'><TodoInput /></div>
          <div className="item"><TodoList /></div>
        </div>
      </div>
    </>
  )
}

export default App
