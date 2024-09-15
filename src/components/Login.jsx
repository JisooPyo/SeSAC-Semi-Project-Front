import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const loginRequest = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/members/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // 응답을 JSON으로 변환합니다.
      const result = await response.json();

      // 요청이 성공한 경우
      if (response.ok) {
        setMessage("");
        alert(result.message);
      } else {
        setMessage(result.message);
      }

      const token = response.headers.get("Authorization"); // Assuming the token is in the 'Authorization' header

      if (token) {
        // Save token to local storage
        localStorage.setItem("token", token);
        alert("토큰 저장 완료!");
        navigate("/");
      } else {
        console.error("Token not found in response");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <h2>로그인</h2>
      <div style={{ border: "1px solid", padding: "30px" }}>
        <form onSubmit={loginRequest}>
          <div style={{ textAlign: "left" }}>
            <div>
              <label htmlFor="email">Email: </label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <label htmlFor="password">Password: </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div>
              <p style={{ color: "yellow" }}>{message}</p>
            </div>
            <br />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
