import { useState } from "react";
import "../css/Todo.css";

function Todo(props) {
  const { id, content, completed, dueDate } = props;

  // 수정 모드를 관리할 상태
  const [isEditing, setIsEditing] = useState(false);
  // 입력 필드의 내용 상태
  const [editedContent, setEditedContent] = useState(content);
  // 입력 필드의 마감일 상태
  const [editedDueDate, setEditedDueDate] = useState(dueDate);
  // 입력 필드의 완료여부 상태
  const [editedCompleted, setEditedCompleted] = useState(completed);

  // 수정 버튼 클릭 핸들러
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(content);
    setEditedDueDate(dueDate);
    setEditedCompleted(completed);
  };

  // 저장 버튼 클릭 핸들러
  const handleSaveClick = () => {
    const todoData = {
      content: editedContent,
      completed: editedCompleted,
      dueDate: editedDueDate,
    };

    try {
      // PUT 요청 보내기
      fetch("http://localhost:8080/api/todos/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(todoData),
      });
    } catch (error) {
      console.error("Error updating todo:", error);
    }
    window.location.reload();
  };

  // 삭제 버튼 클릭 핸들러
  const handleDeleteClick = () => {
    try {
      fetch("http://localhost:8080/api/todos/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
    window.location.reload();
  };

  return (
    <div className="todo">
      <div className="todo-Content">
        {isEditing ? (
          <>
            <input
              type="checkbox"
              checked={editedCompleted}
              onChange={(e) => setEditedCompleted(e.target.checked)}
            />
            <br />
            내용 :{" "}
            <input
              type="text"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <br />
            마감일 :{" "}
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
            ></input>
          </>
        ) : (
          <>
            <input type="checkbox" checked={completed} readOnly />
            <br />
            내용 : {content} <br />
            마감일 : {dueDate} <br />
          </>
        )}
      </div>
      <div className="buttonBox">
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>저장</button>
            <br />
            <button onClick={handleCancelClick}>취소</button>
          </>
        ) : (
          <>
            <button onClick={handleEditClick}>수정</button>
            <br />
            <button onClick={handleDeleteClick}>삭제</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Todo;
