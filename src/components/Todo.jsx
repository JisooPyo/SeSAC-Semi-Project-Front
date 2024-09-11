function Todo(props) {
  const { id, content, completed, dueDate } = props;

  return (
    <>
      <input type="checkbox" checked={completed} /><br />
      내용 : {content} <br />
      마감일 : {dueDate} <br />
    </>
  )
}

export default Todo;