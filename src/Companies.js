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
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //this works here but not in company details

  useEffect(fetchCompaniesOnMount, []);

  /** Fetches companies and sets companies state */
  function fetchCompaniesOnMount(search) {
    async function fetchCompanies(search) {
      const response = await JoblyApi.getCompanies(search);
      setCompanies(response);
    }
    fetchCompanies(search);
    setIsLoading(false);
  }

  /** Resets companies state based on search term */
  function handleSearch(searchTerm) {
    fetchCompaniesOnMount(searchTerm);
  }

  if (isLoading) return <Loading />;

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <CompanyList companies={companies} />
    </div>
  );
}

export default Companies;
