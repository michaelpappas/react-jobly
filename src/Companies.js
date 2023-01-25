// import SearchBar from "./SearchBar";
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

  useEffect(function fetchCompaniesOnMount() {
    async function fetchCompanies() {
      const response = await JoblyApi.getCompanies();
      setCompanies(response);
    }
    fetchCompanies();
    setIsLoading(false);
  }, []);


  if (isLoading) return <Loading />;

  return (<div>
    {/* <SearchBar /> */}
    <CompanyList companies={companies} />

  </div>
  );
}

export default Companies;