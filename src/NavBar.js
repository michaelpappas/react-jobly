import { NavLink } from "react-router-dom";
import userContext from "./userContext";
import { useContext } from "react";
/**
 * Renders Navigation Bar
 * App -> NavBar
 */
function NavBar({ logout }) {
  const { user } = useContext(userContext); //TODO: ternary to call either of two functions that return either auth or non-auth links
  return (
    <nav className="navbar justify-content-between navbar-expand navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">Jobly</NavLink>

      <div>
        <ul className="navbar-nav mr-auto">
          {user ? (
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
                <NavLink className="nav-link" onClick={logout} to="/">
                  Logout
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li> */}
            </>
          ) : (
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
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
