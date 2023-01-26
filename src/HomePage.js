import userContext from "./userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

/**
 * Renders HomePage
 * App -> RouteList -> HomePage
 */
function HomePage() {

  const { user } = useContext(userContext);

  // debugger;
  return (
    <div className="homepage">
      <h1>Jobly</h1>
      <h3>All the jobs in one, convenient place.</h3>
      {user ? (<>{`Welcome back ${user.firstName}`}</>) :
        (<div className="homepage-btn"><Link to="/login" className="btn">Log in</Link><Link to="/signup" className="btn">Sign up</Link></div>)}
      <h1>Homepage</h1>
    </div>



  );
}

export default HomePage;