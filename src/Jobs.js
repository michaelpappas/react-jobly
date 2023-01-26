import { Navigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import JoblyApi from "./api";
import { useState, useEffect, useContext } from "react";
import userContext from "./userContext";
import JobList from "./JobList";
import Error from "./Error";

/**
 * Renders JobList and SearchBar
 * State:
 * - jobs - a list of objects like { id, title, salary, equity }
 * - errors - array of errors from API to display
 */
function Jobs() {
  const { user } = useContext(userContext);

  const [jobs, setJobs] = useState({
    data: [],
    isLoading: true,
  });

  const [errors, setErrors] = useState([]);

  useEffect(fetchJobsOnMount, []);

  /** Fetches jobs and sets job state */
  function fetchJobsOnMount(search) {
    async function fetchJobs(search) {
      try {
        const response = await JoblyApi.getJobs(search);
        setJobs({ data: response, isLoading: false, errors: null });
      } catch (err) {
        setJobs({
          data: null,
          isLoading: false,
        });
        setErrors(err);
      }
    }
    fetchJobs(search);
  }

  /** Resets job state based on search term */
  function handleSearch(searchTerm) {
    fetchJobsOnMount(searchTerm);
  }

  if (!user) return <Navigate to="/" />;

  if (jobs.isLoading) return <Loading />;

  if (errors.length)
    return (
      <>
        {errors.map((error, i) => (
          <Error key={i} error={error} />
        ))}
      </>
    );

  return (
    <div className="Jobs">
      <SearchBar handleSearch={handleSearch} />
      <JobList jobs={jobs.data} />
    </div>
  );
}

export default Jobs;
