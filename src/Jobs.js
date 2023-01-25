import SearchBar from "./SearchBar";
import Loading from "./Loading";
import JoblyApi from "./api";
import { useState, useEffect } from "react";
import JobList from "./JobList";

/**
 * Renders JobList and SearchBar
 * State:
 * - jobs - a list of objects like { id, title, salary, equity }
 */
function Jobs() {
  const [jobs, setJobs] = useState({ data: [], isLoading: true, errors: null });

  useEffect(fetchJobsOnMount, []);

  /** Fetches jobs and sets job state */
  function fetchJobsOnMount(search) {
    async function fetchJobs(search) {
      try {
        const response = await JoblyApi.getJobs(search);
        setJobs({ data: response, isLoading: false, errors: null });
      }
      catch (err) {
        setJobs({
          data: null,
          isLoading: false,
          errors: err
        });
      }
    }

    fetchJobs(search);
  }

  /** Resets job state based on search term */
  function handleSearch(searchTerm) {
    fetchJobsOnMount(searchTerm);
  }

  if (jobs.isLoading) return <Loading />;
  else if (jobs.errors) return <b> Error: {jobs.errors}</b>;

  return (
    <div className="Jobs">
      <SearchBar handleSearch={handleSearch} />
      <JobList jobs={jobs.data} />
    </div>
  );
}

export default Jobs;