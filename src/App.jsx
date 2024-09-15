import "./App.css";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import AppRouter from "./components/AppRouter";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <AppRouter />

      <div className="homeButton">
        <button style={{ marginRight: "10px" }} onClick={goToSignup}>
          회원가입
        </button>

        <button onClick={goToLogin}>로그인</button>
      </div>

      <h1>To-Do List</h1>

      {/* 토큰이 있으면 보여주기, 없으면 보여주지 않기 */}
      <div>
        <div className="container">
          <div className="item">
            <TodoInput />
          </div>
          <div className="item">
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
