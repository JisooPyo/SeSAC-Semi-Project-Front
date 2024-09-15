import Todo from "./Todo";

import { useEffect, useState } from "react";

function TodoList() {
  const [todoList, setTodoList] = useState([]);

  const getTodoList = () => {
    // 데이터 가져오기
    fetch("http://localhost:8080/api/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setTodoList(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <>
      {todoList.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </>
  );
}

export default TodoList;
