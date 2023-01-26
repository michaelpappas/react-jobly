import { NavLink } from "react-router-dom";
import userContext from "./userContext";
import { useContext } from "react";
/**
 * Renders Navigation Bar
 * App -> NavBar
 */
function NavBar() {
  const { user } = useContext(userContext);
  return (
    <nav className="NavBar">
      <div></div>
      <NavLink to="/">Home</NavLink>
      <div className="NavBar-right">
        {user.data ? (
          <>
            <NavLink to="/companies">Companies</NavLink>
            <NavLink to="/jobs">Jobs</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
