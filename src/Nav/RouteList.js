import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import HomePage from "../Homepage/HomePage";
import Companies from "../Companies/Companies";
import CompanyDetail from "../Companies/CompanyDetail";
import Jobs from "../Jobs/Jobs";
import LoginForm from "../User/LoginForm";
import SignUpForm from "../User/SignUpForm";
import userContext from "../User/userContext";
import EditProfile from "../User/EditProfile";

/**
 * Routes for Jobly App
 * Props:
 * -login - login function to call in parent
 * -signUp - signUp function to call in parent
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
