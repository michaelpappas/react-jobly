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
function Jobs(){
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(fetchJobsOnMount, []);

  function fetchJobsOnMount(search) {
    async function fetchJobs(search) {
      const response = await JoblyApi.getJobs(search);
      setJobs(response)
    }
    fetchJobs(search);
    setIsLoading(false)
  }

  function handleSearch(searchTerm) {
    fetchJobsOnMount(searchTerm)
  }

  if (isLoading) return <Loading />;

  return (
    <div className="Jobs">
      <SearchBar handleSearch={handleSearch}/>
      <JobList jobs={jobs}/>
    </div>
  )
}

export default Jobs;