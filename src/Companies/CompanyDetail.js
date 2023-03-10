import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobList from "../Jobs/JobList";
import Loading from "../Utilities/Loading";
import Errors from "../Utilities/Errors";

/**
 * Display Jobs and company details from a specific company
 * State:
 * - company - a company object like { handle, name, numEmployees, jobs }
 *    jobs - a list of objects like { id, title, salary, equity }
 * - errors - array of errors from API to display
 */
function CompanyDetail() {

  const { handle } = useParams();

  const [company, setCompany] = useState({
    data: {},
    isLoading: true,
  });

  const [errors, setErrors] = useState([]);

  useEffect(fetchCompanyOnMount, [handle]);

  /** Fetches company and set company state */
  function fetchCompanyOnMount() {
    async function fetchCompany() {
      try {
        const response = await JoblyApi.getCompany(handle);
        setCompany({ data: response, isLoading: false });
      } catch (err) {
        setCompany({
          data: null,
          isLoading: false,
        });
        setErrors(err);
      }
    }
    fetchCompany();
  }

  if (company.isLoading) return <Loading />;

  if (errors.length) return <Errors errors={errors} />;

  return (
    <div>
      <h1>{company.data.name}</h1>
      <p>{company.data.description}</p>
      <JobList jobs={company.data.jobs} />
    </div>
  );
}

export default CompanyDetail;
