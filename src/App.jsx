import './App.css'
import TodoList from './components/TodoList'

function App() {
  return (
    <>
      <div>
        <h1>To-Do List</h1>
        <div className="container">
          <div className="item"><h3>수평 테스트</h3></div>
          <div className="item"><TodoList /></div>
        </div>
      </div>
    </>
  )
}

export default App
