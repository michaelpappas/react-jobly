import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import Companies from "./Companies";
import CompanyDetails from "./CompanyDetails";
import Jobs from "./Jobs";

/**
 * Routes for Jobly App
 *  App -> RouteList -> {HomePage, Companies, CompanyDetails, Jobs}
 */

function RouteList() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<Companies />} path="/companies" />
      <Route element={<CompanyDetails />} path="/company/:handle" />
      <Route element={<Jobs />} path="/jobs" />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouteList;
