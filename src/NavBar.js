import { NavLink } from "react-router-dom";
import userContext from "./userContext";
import { useContext } from "react";
/**
 * Renders Navigation Bar
 * App -> NavBar
 */
function NavBar({ logout }) {
  const { user } = useContext(userContext);
  return (
    <nav className="NavBar">
      <div></div>
      <NavLink to="/">Home</NavLink>
      <div className="NavBar-right">
        {user ? (
          <>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/jobs">Jobs</NavLink>
            <NavLink onClick={logout} to="/">Logout</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
