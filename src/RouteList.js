import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import HomePage from "./HomePage";
import Companies from "./Companies";
import CompanyDetail from "./CompanyDetail";
import Jobs from "./Jobs";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import userContext from "./userContext";
import EditProfile from "./EditProfile";

/**
 * Routes for Jobly App
 *  App -> RouteList -> {HomePage, Companies, CompanyDetail, Jobs}
 */

function RouteList({ login, signUp }) {
  const { user } = useContext(userContext);

  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      {user && (
        <>
          <Route element={<Companies />} path="/companies" />
          <Route element={<CompanyDetail />} path="/companies/:handle" />
          <Route element={<Jobs />} path="/jobs" />
          <Route element={<EditProfile />} path="/profile" />
        </>
      )}
      {!user && (
        <>
          <Route element={<LoginForm login={login} />} path="/login" />
          <Route element={<SignUpForm signUp={signUp} />} path="/signup" />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouteList;
