// import { useState } from "react";
// import LoginForm from "/src/components/LoginForm";
// import SignUpForm from "/src/components/SignUpForm";
// import { Button } from "../styles";

// function Login({ onLogin }) {
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <Wrapper>
//       <Logo>PokeDecks</Logo>
//       {showLogin ? (
//         <>
//           <LoginForm onLogin={onLogin} />
//           <Divider />
//           <p>
//             Don't have an account? &nbsp;
//             <Button onClick={() => setShowLogin(false)}>
//               Sign Up
//             </Button>
//           </p>
//         </>
//       ) : (
//         <>
//           <SignUpForm onLogin={onLogin} />
//           <Divider />
//           <p>
//             Already have an account? &nbsp;
//             <Button onClick={() => setShowLogin(true)}>
//               Log In
//             </Button>
//           </p>
//         </>
//       )}
//     </Wrapper>
//   );
// }
// const Logo = styled.h1`
//   font-family: "Permanent Marker", cursive;
//   font-size: 3rem;
//   color: deeppink;
//   margin: 8px 0 16px;
// `;

// const Wrapper = styled.section`
//   max-width: 500px;
//   margin: 40px auto;
//   padding: 16px;
// `;

// const Divider = styled.hr`
//   border: none;
//   border-bottom: 1px solid #ccc;
//   margin: 16px 0;
// `;


// export default Login;

import React, { useState } from "react";
import LoginForm from "/src/components/LoginForm";
import SignUpForm from "/src/components/SignUpForm";
import { Button } from "../styles";
import {useNavigate} from "react-router-dom"

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);
 // const navigate=useNavigate()

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
