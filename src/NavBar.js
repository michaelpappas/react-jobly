import { NavLink } from "react-router-dom";

/**
 * Renders Navigation Bar
 * App -> NavBar
 */
function NavBar() {
  return(
    <nav className="NavBar">
      <NavLink to="/">Home</NavLink>
      <div className="NavBar-right">
        <NavLink to="/companies">Companies</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
      </div>
    </nav>
  )
}

export default NavBar