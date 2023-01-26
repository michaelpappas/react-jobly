import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import Companies from "./Companies";
import CompanyDetail from "./CompanyDetail";
import Jobs from "./Jobs";
import LoginForm from "./LoginForm";

/**
 * Routes for Jobly App
 *  App -> RouteList -> {HomePage, Companies, CompanyDetail, Jobs}
 */

function RouteList({login}) {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<Companies />} path="/companies" />
      <Route element={<CompanyDetail />} path="/companies/:handle" />
      <Route element={<Jobs />} path="/jobs" />
      <Route element={<LoginForm login={login} />} path="/login" />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouteList;
