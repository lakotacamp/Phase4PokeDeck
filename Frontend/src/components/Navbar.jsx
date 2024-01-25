import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <nav className="Navbar">
      <div>
        <Link to="/">Logout</Link>
      </div>
      <div>
        {user && (
          <button className="Logout" onClick={handleLogoutClick}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
