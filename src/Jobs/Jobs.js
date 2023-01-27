import SearchBar from "../Utilities/SearchBar";
import Loading from "../Utilities/Loading";
import JoblyApi from "../api";
import { useState, useEffect } from "react";
import JobList from "./JobList";
import Errors from "../Utilities/Errors";

/**
 * Renders JobList and SearchBar
 * State:
 * - jobs - a list of objects like { id, title, salary, equity }
 * - errors - array of errors from API to display
 */
function Jobs() {
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
        const response = await JoblyApi.getJobs(search || null);
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

  if (jobs.isLoading) return <Loading />;

  if (errors.length) return <Errors errors={errors} />;

  return (
    <div className="Jobs">
      <div className="header d-flex justify-content-between w-100">
        <h2>Jobs</h2>
        <SearchBar handleSearch={handleSearch} />
      </div>
      {jobs.data.length > 0 ? (
        <JobList jobs={jobs.data} />
      ) : (
        <h2>No results found</h2>
      )}
    </div>
  );
}

export default Jobs;
