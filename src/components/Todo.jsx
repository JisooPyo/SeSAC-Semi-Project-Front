import '../css/Todo.css'

function Todo(props) {
  const { id, content, completed, dueDate } = props;

  return (
    <div className="todo">
      <input type="checkbox" checked={completed} /><br />
      내용 : {content} <br />
      마감일 : {dueDate} <br />
    </div>
  )
}

export default Todo;