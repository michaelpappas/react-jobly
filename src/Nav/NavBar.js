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
    <nav className="Navbar navbar justify-content-between navbar-expand navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Jobly
        </NavLink>
        <ul className="navbar-nav mr-auto">
          {user ? renderAuthNav() : renderUnauthNav()}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
