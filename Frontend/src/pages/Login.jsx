import React, { useState } from "react";
import LoginForm from "/src/components/LoginForm";
import SignUpForm from "/src/components/SignUpForm";
<<<<<<< HEAD
import MainPage from "/src/pages/MainPage";
=======
import TeamList from "./MainPage";
>>>>>>> f3aa11eabdaa51641f589d5bcf9809593306a9be
import { Button } from "../styles";


function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="Wrapper">
      <h1 className="Logo">PokeDecks</h1>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <hr className="Divider" />
          <p>
            Don't have an account? &nbsp;
            <button onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <hr className="Divider" />
          <p>
            Already have an account? &nbsp;
            <button onClick={() => {setShowLogin(true)
<<<<<<< HEAD
=======
          // navigate("/main-page")  
>>>>>>> f3aa11eabdaa51641f589d5bcf9809593306a9be
          }}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default Login;
