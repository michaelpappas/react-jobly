import SearchBar from "../Utilities/SearchBar";
import CompanyList from "./CompanyList";
import Loading from "../Utilities/Loading";
import JoblyApi from "../api";
import { useState, useEffect } from "react";

import Errors from "../Utilities/Errors";

/**
 * Companies - Renders CompaniesList and SearchBar
 *
 * State:
 * - Companies - Array of company obj like [{handle, name, numEmployees,... }]
 * - errors - array of errors from API to display
 */
function Companies() {
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
        const response = await JoblyApi.getCompanies(search || null);
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

  if (companies.isLoading) return <Loading />;

  if (errors.length) return <Errors errors={errors} />;

  return (
    <div className="Companies">
      <div className="header d-flex justify-content-between w-100">
        <h2>Companies</h2>
        <SearchBar handleSearch={handleSearch} />
      </div>
      {companies.data.length > 0 ? (
        <CompanyList companies={companies.data} />
      ) : (
        <h2>No results found</h2>
      )}
    </div>
  );
}

export default Companies;
