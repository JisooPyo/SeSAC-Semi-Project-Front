import "./App.css";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import AppRouter from "./components/AppRouter";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [nickname, setNickname] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    getNickname();
  });

  const getNickname = () => {
    fetch("http://localhost:8080/api/members/nickname", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch nickname");
        }
        return response.text();
      })
      .then((data) => setNickname(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToLogOut = () => {
    localStorage.removeItem("token");
    console.log("Token removed from localStorage");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <h1>To-Do List</h1>

      {!isLoggedIn && (
        <>
          <div className="homeTop">
            <button style={{ marginRight: "10px" }} onClick={goToSignup}>
              회원가입
            </button>

            <button onClick={goToLogin}>로그인</button>
          </div>
        </>
      )}

      <AppRouter />

      {/* 토큰이 있으면 보여주기, 없으면 보여주지 않기 */}
      {isLoggedIn && (
        <>
          <div className="homeTop">
            <button onClick={goToLogOut}>로그아웃</button>
            <p>{nickname}님 반가워요!</p>
          </div>
          <div className="container">
            <div className="item">
              <TodoInput />
            </div>
            <div className="item">
              <TodoList />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
