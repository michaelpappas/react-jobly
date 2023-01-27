import { NavLink } from "react-router-dom";
import userContext from "../User/userContext";
import { useContext } from "react";
/**
 * Renders Navigation Bar
 * Props:
 * - logout - function to call in parent
 * App -> NavBar
 */
function NavBar({ logout }) {
  const { user } = useContext(userContext);

  function renderAuthNav() {
    return (
      <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/companies">
            Companies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/jobs">
            Jobs
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/applications">
            Applications
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" onClick={logout} to="/">
            Logout
          </NavLink>
        </li>
      </>
    );
  }

  function renderUnauthNav() {
    return (
      <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
      </>
    );
  }
  return (
    <nav className="Navbar navbar justify-content-between navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand ms-2" to="/">
          Jobly
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {user ? renderAuthNav() : renderUnauthNav()}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
