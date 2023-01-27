import userContext from "../User/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
/**
 * Renders HomePage
 * App -> RouteList -> HomePage
 */
function HomePage() {
  const { user } = useContext(userContext);

  // debugger;
  return (
    <div className="HomePage">
      <h1>Jobly</h1>
      <h3>All the jobs in one, convenient place.</h3>
      {user ? (
        <>{`Welcome back ${user.firstName}`}</>
      ) : (
        <div className="HomePage-btn">
          <Link to="/login" className="btn btn-primary mr-2">
            Log in
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}

export default HomePage;
