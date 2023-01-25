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
  const { handle } = useParams();

  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(fetchCompanyOnMount, []);

  function fetchCompanyOnMount() {
    async function fetchCompany() {
      console.log("handle,", handle);
      const response = await JoblyApi.getCompany(handle);
      console.log("response-", response);
      setCompany(response);

    }
    fetchCompany();

    setIsLoading(false);
  }

  console.log("company-", company);
  console.log("isloading", isLoading);
  if (isLoading) return <Loading />;

  return (
    <div>
      <h1>CompanyDetails for {company.name}</h1>
      <p>{company.description}</p>
      {/* <JobList jobs={company.jobs} /> */}
    </div>
  );
};

export default CompanyDetails;