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
function CompanyDetail() {

  const { handle } = useParams();

  const [company, setCompany] = useState({ data: {}, isLoading: true, errors: null });

  useEffect(fetchCompanyOnMount, [handle]);

  /** Fetches company and set company state */
  function fetchCompanyOnMount() {
    async function fetchCompany() {
      try {
        const response = await JoblyApi.getCompany(handle);
        setCompany({ data: response, isLoading: false });
      }
      catch (err) {
        setCompany({
          data: null,
          isLoading: false,
          errors: err
        });
      }
    }
    fetchCompany();
  }


  if (company.isLoading) return <Loading />;
  else if (company.errors) return <b> Error: {company.errors}</b>;

  return (
    <div>
      <h1>CompanyDetail for {company.data.name}</h1>
      <p>{company.data.description}</p>
      <JobList jobs={company.data.jobs} />
    </div>
  );
};

export default CompanyDetail;