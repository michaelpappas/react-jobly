import userContext from "../User/userContext";
import { useContext, useState, useEffect } from "react";
import JobList from "../Jobs/JobList";
import JoblyApi from "../api";

import Loading from "../Utilities/Loading";
import Errors from "../Utilities/Errors";

/**
 * Applications - Renders JobList components
 */
function Applications() {
  const [jobs, setJobs] = useState({
    data: [],
    isLoading: true,
  });
  const [errors, setErrors] = useState([]);

  const { user } = useContext(userContext);

  useEffect(fetchJobsOnMount, [user]);

  function fetchJobsOnMount() {
    async function fetchJobs() {
      try {
        const appsList = user.applications;
        const response = await JoblyApi.getJobs();
        const appliedJobs = response.filter((job) => appsList.includes(job.id));
        setJobs({
          data: appliedJobs,
          isLoading: false,
        });
      } catch (err) {
        setErrors(err);
      }
    }
    fetchJobs();
  }

  if (errors.length) return <Errors errors={errors} />;
  if (jobs.isLoading) return <Loading />;

  return (
    <>
      <h2 className="mb-4">Applications</h2>
      <JobList jobs={jobs.data} />
    </>
  );
}

export default Applications;
