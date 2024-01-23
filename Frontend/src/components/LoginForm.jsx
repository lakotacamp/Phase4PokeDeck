import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const navigate=useNavigate()
=======
  const navigate = useNavigate()
>>>>>>> f3aa11eabdaa51641f589d5bcf9809593306a9be
  
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {onLogin(user)
<<<<<<< HEAD
          navigate("/main-page") });
=======
        navigate("/main-page")});
>>>>>>> f3aa11eabdaa51641f589d5bcf9809593306a9be
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
  
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
    
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button variant="fill" type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>

        {/* {errors.map((err) => (
        //  <Error key={err}>{err}</Error>
        //))} */}
    </form>
  );
}

export default LoginForm;