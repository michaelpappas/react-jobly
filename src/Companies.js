import SearchBar from "./SearchBar";
import CompanyList from "./CompanyList";
import Loading from "./Loading";
import JoblyApi from "./api";
import { useState, useEffect } from "react";
/**
 * Companies - Renders CompaniesList and SearchBar
 *
 * State:
 * - Companies - Array of company obj like [{handle, name, numEmployees,... }]
 */
function Companies() {
  const [companies, setCompanies] = useState({ data: [], isLoading: true, errors: null });

  useEffect(fetchCompaniesOnMount, []);

  /** Fetches companies and sets companies state */
  function fetchCompaniesOnMount(search) {
    async function fetchCompanies(search) {
      try {
        const response = await JoblyApi.getCompanies(search);
        setCompanies({ data: response, isLoading: false, errors: null });
      }
      catch (err) {
        setCompanies({
          data: null,
          isLoading: false,
          errors: err
        });
      }
    }
    fetchCompanies(search);
  }

  /** Resets companies state based on search term */
  function handleSearch(searchTerm) {
    fetchCompaniesOnMount(searchTerm);
  }

  if (companies.isLoading) return <Loading />;
  else if (companies.errors) return <b> Error: {companies.errors}</b>;

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <CompanyList companies={companies.data} />
    </div>
  );
}

export default Companies;
