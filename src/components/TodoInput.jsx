import { useState } from "react";

function TodoInput() {
  const [content, setContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // 페이지 리로드 방지

    // 요청 데이터 객체 생성
    const todoData = { content, dueDate };

    try {
      // POST 요청 보내기
      const response = await fetch("http://localhost:8080/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(todoData),
      });

      // 응답 처리
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSuccess("Todo added successfully!");
      setContent("");
      setDueDate("");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>Add Todo</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Content:{" "}
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <div>
          <label>
            Due Date:{" "}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <button type="submit">Add Todo</button>
      </form>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TodoInput;
