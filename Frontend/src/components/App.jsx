import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import NavBar from "./NavBar";
import Login from "/src/pages/Login";
import MainPage from "/src/pages/MainPage";
// import CreateTeam from "/src/pages/create-team";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if (!user) return <Login onLogin={setUser} />;

//   return (
//     <>
//      <Logo>PokeDecks</Logo>
//       <NavBar user={user} setUser={setUser} />
//       <main>
//         <Switch>
//           <Route path="/new">
//             <CreateTeam user={user} />
//           </Route>
//           <Route path="/">
//             <MainPage />
//           </Route>
//         </Switch>
//       </main>
//     </>
//   );
// }
return (
  <>
  <div>
    Test

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/main-page" element={<MainPage/>}/>
    </Routes>
  </BrowserRouter>
  </div>
  </>
)
}
export default App;
