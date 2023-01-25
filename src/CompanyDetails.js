import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobList from "./JobList";
import Loading from "./Loading";

/**
 * Display Jobs and company details from a specific company
 * State:
 * - company - a company object like { handle, name, numEmployees, jobs }
 *    jobs - a list of objects like { id, title, salary, equity }
 */
function CompanyDetails() {
  //TODO:rename to CompanyDetail
  const { handle } = useParams();

  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //TODO: batch loading with company states
  // ran into bug where loading is set to false before promise is finished awaiting

  useEffect(fetchCompanyOnMount, [handle]);

  /** Fetches company and set company state */
  function fetchCompanyOnMount() {
    async function fetchCompany() {
      const response = await JoblyApi.getCompany(handle);
      //TODO: add some error handling
      setCompany(response);
      setIsLoading(false);
    }
    fetchCompany();
  }

  // if(!company) return <Loading/>
  if (isLoading) return <Loading />;

  return (
    <div>
      <h1>CompanyDetails for {company.name}</h1>
      <p>{company.description}</p>
      <JobList jobs={company.jobs} />
    </div>
  );
};

export default CompanyDetails;