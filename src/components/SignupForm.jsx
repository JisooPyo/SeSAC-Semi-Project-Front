import { useState } from "react";

function SignupForm() {

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const signup = () => {
    if (!email || !password) {
      setMessage('Email and password are required');
      return;
    }

    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        const token = data.headers?.get('Authorization'); // JWT 추출
        if (token) {
          localStorage.setItem('jwt', token); // JWT를 localStorage에 저장
        }

        if (data.message) {
          alert(data.message);  // ApiResponseDto의 message 필드 출력
        }

        setMessage('Login successful!');
      })
      .catch(error => {
        setMessage('Login failed. Please try again.');
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div style={{ maxWidth: '300px', margin: '100px auto', padding: '20px', border: '1px solid #ccc' }}>

        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div style={{ marginTop: '10px' }}>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div style={{ marginTop: '10px' }}>
          <label htmlFor="nickname">Nickname:  </label>
          <input type="text" id="nickname" placeholder="Enter your nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
        </div>

        <div style={{ marginTop: '20px' }}>
          <button onClick={signup} style={{ width: '120px', padding: '10px' }}>
            회원가입
          </button>
        </div>
      </div>
    </>
  )
}

export default SignupForm;
