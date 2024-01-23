import React, { useState } from "react";
import LoginForm from "/src/components/LoginForm";
import SignUpForm from "/src/components/SignUpForm";
import { Button } from "../styles";
//import {useNavigate} from "react-router-dom"


function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
 //const navigate=useNavigate()

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
          //navigate("/main-page")  
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
