import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const signupRequest = async (e) => {
    e.preventDefault();

    // 요청을 보낼 데이터를 객체로 만듭니다.
    const requestData = {
      email,
      password,
      nickname,
    };

    try {
      // POST 요청을 보냅니다.
      const response = await fetch("http://localhost:8080/api/members/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // 응답을 JSON으로 변환합니다.
      const result = await response.json();

      // 요청이 성공한 경우
      if (response.ok) {
        setMessage("");
        alert(result.message); // 메시지를 알림으로 표시합니다.
        navigate("/");
      } else {
        // 요청이 실패한 경우
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div>
        <h2>회원가입</h2>

        <form onSubmit={signupRequest}>
          <div className="container" style={{ textAlign: "left" }}>
            <div className="item" style={{ padding: "20px" }}>
              <div>
                <label>Email: </label>
                <input
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <br />

              <div>
                <label>Password: </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <br />

              <div>
                <label>Nickname: </label>
                <input
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="item">
              <p> --- 비밀번호 규칙 --- </p>
              <p>8자 이상</p>
              <p>영소문자, 숫자 한 개 이상 포함</p>
              <p>특수문자(!,?,@,#,$,%,^,&,*,_,=,+,-) 한 개 이상 포함</p>
            </div>
          </div>
          <div>
            <p style={{ color: "yellow" }}>{message}</p>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
