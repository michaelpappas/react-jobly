import { Navigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import CompanyList from "./CompanyList";
import Loading from "./Loading";
import JoblyApi from "./api";
import { useState, useEffect, useContext } from "react";
import userContext from "./userContext";
import Error from "./Error";

/**
 * Companies - Renders CompaniesList and SearchBar
 *
 * State:
 * - Companies - Array of company obj like [{handle, name, numEmployees,... }]
 * - errors - array of errors from API to display
 */
function Companies() {
  const { user } = useContext(userContext);

  const [companies, setCompanies] = useState({
    data: [],
    isLoading: true,
  });

  const [errors, setErrors] = useState([]);

  useEffect(fetchCompaniesOnMount, []);

  /** Fetches companies and sets companies state */
  function fetchCompaniesOnMount(search) {
    async function fetchCompanies(search) {
      try {
        const response = await JoblyApi.getCompanies(search);
        setCompanies({ data: response, isLoading: false, errors: null });
      } catch (err) {
        setCompanies({
          data: null,
          isLoading: false,
        });
        setErrors(err);
      }
    }
    fetchCompanies(search);
  }

  /** Resets companies state based on search term */
  function handleSearch(searchTerm) {
    fetchCompaniesOnMount(searchTerm);
  }

  if (!user) return <Navigate to="/" />;

  if (companies.isLoading) return <Loading />;

  if (errors.length)
    return (
      <>
        {errors.map((error, i) => (
          <Error key={i} error={error} />
        ))}
      </>
    );

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <CompanyList companies={companies.data} />
    </div>
  );
}

export default Companies;
